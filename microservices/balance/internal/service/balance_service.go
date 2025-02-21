package service

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/balance/internal/gateway"
)

type (
	BalanceService struct {
		balanceGateway gateway.BalanceGateway
	}
	SaveBalanceInput struct {
		AccountID string  `json:"account_id"`
		Amount    float64 `json:"amount"`
	}
	GetBalanceInput struct {
		AccountID string `json:"account_id"`
	}
	GetBalanceOutput struct {
		AccountID string  `json:"account_id"`
		Amount    float64 `json:"amount"`
	}
)

func NewBalanceService(
	balanceGateway gateway.BalanceGateway,
) *BalanceService {
	return &BalanceService{
		balanceGateway,
	}
}

func (s *BalanceService) SaveBalance(ctx context.Context, input *SaveBalanceInput) error {
	balance := &gateway.Balance{
		AccountID: input.AccountID,
		Amount:    input.Amount,
	}
	return s.balanceGateway.Save(ctx, balance)
}

func (s *BalanceService) GetBalance(ctx context.Context, input *GetBalanceInput) (*GetBalanceOutput, error) {
	balance, err := s.balanceGateway.Get(ctx, input.AccountID)
	if err != nil {
		return nil, err
	}
	return &GetBalanceOutput{
		AccountID: balance.AccountID,
		Amount:    balance.Amount,
	}, nil
}
