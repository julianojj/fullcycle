package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/google/uuid"
)

func main() {
	deliveryChannel := make(chan kafka.Event)
	producer := NewKafkaProducer()
	msg := map[string]any{
		"id":         uuid.NewString(),
		"from":       uuid.NewString(),
		"to":         uuid.NewString(),
		"amount":     1000,
		"created_at": time.Now().UTC(),
	}
	msgJson, err := json.Marshal(msg)
	if err != nil {
		panic(err)
	}
	if err := Publish(string(msgJson), "fullcycle", producer, nil, deliveryChannel); err != nil {
		panic(err)
	}
	go DeliveryReport(deliveryChannel)
	producer.Flush(1000)
}

func NewKafkaProducer() *kafka.Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":   "localhost:9092",
		"acks":                "all",
		"enable.idempotence":  "true",
		"delivery.timeout.ms": "0",
	}
	producer, err := kafka.NewProducer(configMap)
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	return producer
}

func Publish(msg string, topic string, producer *kafka.Producer, key []byte, deliveryChan chan kafka.Event) error {
	message := &kafka.Message{
		Value: []byte(msg),
		TopicPartition: kafka.TopicPartition{
			Topic:     &topic,
			Partition: kafka.PartitionAny,
		},
		Key: key,
	}
	err := producer.Produce(message, deliveryChan)
	if err != nil {
		return err
	}
	fmt.Printf("Mensagem publicada: %s\n", msg)
	return nil
}

func DeliveryReport(deliveryChan chan kafka.Event) {
	for e := range deliveryChan {
		switch ev := e.(type) {
		case *kafka.Message:
			if ev.TopicPartition.Error != nil {
				fmt.Println("Erro ao enviar")
			} else {
				fmt.Printf("Mensagem entregue na partição: %v\n", ev.TopicPartition)
			}
		}
	}
}
