package usecase

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/gateway"
)

type (
	CreateTransaction struct {
		accountGateway     gateway.AccountGateway
		transactionGateway gateway.TransactionGateway
	}
	CreateTransactionInput struct {
		AccountFrom string  `json:"account_from"`
		AccountTo   string  `json:"account_to"`
		Amount      float64 `json:"amount"`
	}
	CreateTransactionOutput struct {
		ID     string  `json:"id"`
		Amount float64 `json:"amount"`
	}
)

func NewCreateTransaction(
	accountGateway gateway.AccountGateway,
	transactionGateway gateway.TransactionGateway,
) *CreateTransaction {
	return &CreateTransaction{
		accountGateway,
		transactionGateway,
	}
}

func (c *CreateTransaction) Execute(ctx context.Context, input *CreateTransactionInput) (*CreateTransactionOutput, error) {
	accountFrom, err := c.accountGateway.Find(ctx, input.AccountFrom)
	if err != nil {
		return nil, err
	}
	accountTo, err := c.accountGateway.Find(ctx, input.AccountTo)
	if err != nil {
		return nil, err
	}
	transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
	if err != nil {
		return nil, err
	}
	if err := c.transactionGateway.Create(ctx, transaction); err != nil {
		return nil, err
	}
	return &CreateTransactionOutput{
		ID:     transaction.ID,
		Amount: transaction.Amount,
	}, nil
}
