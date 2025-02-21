package handler

import (
	"fmt"

	"github.com/julianojj/fullcycle/eda/pkg/events"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/kafka"
)

type UpdateBalanceKafkaHandler struct {
	producer *kafka.Producer
}

func NewUpdateBalanceKafkaHandler(
	producer *kafka.Producer,
) *UpdateBalanceKafkaHandler {
	return &UpdateBalanceKafkaHandler{
		producer,
	}
}

func (tc *UpdateBalanceKafkaHandler) Name() string {
	return "UpdateBalanceKafkaHandler"
}

func (tc *UpdateBalanceKafkaHandler) Handle(event events.Event) {
	tc.producer.Publish(event, nil, "balances")
	fmt.Println("Evento publicado no apache kafka", event.Payload())
}
