package handler

import (
	"fmt"

	"github.com/julianojj/fullcycle/eda/pkg/events"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/kafka"
)

type TransactionCreatedKafkaHandler struct {
	producer *kafka.Producer
}

func NewTransactionCreatedKafkaHandler(
	producer *kafka.Producer,
) *TransactionCreatedKafkaHandler {
	return &TransactionCreatedKafkaHandler{
		producer,
	}
}

func (tc *TransactionCreatedKafkaHandler) Name() string {
	return "TransactionCreatedKafkaHandler"
}

func (tc *TransactionCreatedKafkaHandler) Handle(event events.Event) {
	tc.producer.Publish(event, nil, "transactions")
	fmt.Println("Evento publicado no apache kafka", event.Payload())
}
