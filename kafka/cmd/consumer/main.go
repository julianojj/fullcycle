package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/kafka"
)

func main() {
	msgChannel := make(chan *kafka.Message)
	consumer := NewKafkaConsumer()
	go Consume(consumer, []string{"fullcycle"}, msgChannel)
	for msg := range msgChannel {
		fmt.Println(string(msg.Value))
	}
	select{}
}

func NewKafkaConsumer() *kafka.Consumer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"client.id":         "goapp-consumer",
		"group.id":          "goapp-group",
		"auto.offset.reset": "earliest",
	}
	consumer, err := kafka.NewConsumer(configMap)
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	return consumer
}

func Consume(consumer *kafka.Consumer, topics []string, msgChannel chan *kafka.Message) {
	if err := consumer.SubscribeTopics(topics, nil); err != nil {
		panic(err)
	}
	for {
		msg, err := consumer.ReadMessage(-1)
		if err != nil {
			panic(err)
		}
		msgChannel <- msg
	}
}
