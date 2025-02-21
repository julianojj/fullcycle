package gateway

import "context"

type Balance struct {
	AccountID string  `json:"account_id"`
	Amount    float64 `json:"amount"`
}

type BalanceGateway interface {
	Save(ctx context.Context, balance *Balance) error
	Get(ctx context.Context, accountID string) (*Balance, error)
}
