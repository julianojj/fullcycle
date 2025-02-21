package worker

import (
	"context"
	"encoding/json"
	"log/slog"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/julianojj/fullcycle/microservices/balance/internal/service"
)

type (
	Worker struct {
		balanceService *service.BalanceService
	}
	Msg struct {
		Data Data `json:"Data"`
	}
	Data struct {
		AccountFrom        string  `json:"account_from"`
		AccountTo          string  `json:"account_to"`
		BalanceAccountFrom float64 `json:"balance_account_from"`
		BalanceAccountTo   float64 `json:"balance_account_to"`
	}
)

func NewWorker(
	balanceService *service.BalanceService,
) *Worker {
	return &Worker{
		balanceService,
	}
}

func (w *Worker) Execute(ctx context.Context, msgs chan *ckafka.Message) {
	for msg := range msgs {
		var input *Msg
		if err := json.Unmarshal(msg.Value, &input); err != nil {
			slog.Error(
				"error to unmarshal message",
				slog.Any("error", err),
			)
			continue
		}
		inputFrom := map[string]any{
			"account_id": input.Data.AccountFrom,
			"amount":     input.Data.BalanceAccountFrom,
		}
		inputTo := map[string]any{
			"account_id": input.Data.AccountTo,
			"amount":     input.Data.BalanceAccountTo,
		}
		if err := w.SaveBalance(ctx, inputFrom); err != nil {
			continue
		}
		if err := w.SaveBalance(ctx, inputTo); err != nil {
			continue
		}
		slog.Info(
			"transaction executed",
			slog.Any("account_from", inputFrom),
			slog.Any("account_to", inputTo),
		)
	}
}

func (w *Worker) SaveBalance(ctx context.Context, msg map[string]any) error {
	input := &service.SaveBalanceInput{
		AccountID: msg["account_id"].(string),
		Amount:    msg["amount"].(float64),
	}
	if err := w.balanceService.SaveBalance(ctx, input); err != nil {
		slog.Error(
			"error to save balance",
			slog.Any("error", err),
		)
		return err
	}
	return nil
}
