package main

import (
	"context"
	"database/sql"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/julianojj/fullcycle/eda/pkg/events"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/api"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/api/routes"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/event"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/event/handler"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/repository"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/usecase"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/kafka"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/uow"

	_ "github.com/lib/pq"
)

func main() {
	db, err := sql.Open("postgres", "postgresql://juliano:12345678@db:5432/fullcycle?sslmode=disable")
	if err != nil {
		panic(err)
	}

	kafkaConfig := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:9092",
	}

	kafkaProducer := kafka.NewKafkaProducer(&kafkaConfig)

	clientRepository := repository.NewClientRepositoryDatabase(db)
	accountRepository := repository.NewAccountRepositoryDatabase(db)
	transactionRepository := repository.NewTransactionRepositoryDatabase(db)

	uowork := uow.NewUow(context.Background(), db)

	uowork.Register("TransactionRepository", func(tx *sql.Tx) interface{} {
		return transactionRepository
	})
	uowork.Register("AccountRepository", func(tx *sql.Tx) interface{} {
		return accountRepository
	})

	publisher := new(events.PublisherDispatch)

	transactionCreated := event.NewTransactionCreatedEvent()
	balanceUpdated := event.NewBalanceUpdatedEvent()

	transactionCreatedHandler := handler.NewTransactionCreatedKafkaHandler(kafkaProducer)
	updateBalanceHandler := handler.NewUpdateBalanceKafkaHandler(kafkaProducer)

	publisher.Register(transactionCreatedHandler)
	publisher.Register(updateBalanceHandler)

	createClient := usecase.NewCreateClient(clientRepository)
	createAccount := usecase.NewCreateAccount(clientRepository, accountRepository)
	createTransaction := usecase.NewCreateTransaction(uowork, publisher, transactionCreated, balanceUpdated)

	server := api.NewServer()

	routes.NewRoutes(
		server,
		createClient,
		createAccount,
		createTransaction,
		clientRepository,
		accountRepository,
	).Init()

	server.Run(":8080")
}
