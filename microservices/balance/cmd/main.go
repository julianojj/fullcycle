package main

import (
	"context"
	"fmt"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/julianojj/fullcycle/microservices/balance/internal/repository"
	"github.com/julianojj/fullcycle/microservices/balance/internal/service"
	"github.com/julianojj/fullcycle/microservices/balance/pkg/kafka"
	"github.com/julianojj/fullcycle/microservices/balance/pkg/worker"
)

func main() {
	balanceGateway := repository.NewBalanceRepositoryDatabase()
	balanceService := service.NewBalanceService(balanceGateway)
	w := worker.NewWorker(balanceService)

	kafkaConfig := ckafka.ConfigMap{
		"bootstrap.servers": "kafka:9092",
		"group.id":          "balance_consumer_group",
		"auto.offset.reset": "earliest",
	}

	consumer := kafka.NewConsumer(&kafkaConfig, []string{"balances"})

	msgs := make(chan *ckafka.Message)

	go consumer.Consume(msgs)

	ctx := context.Background()

	fmt.Println("Starting worker")

	w.Execute(ctx, msgs)

}
