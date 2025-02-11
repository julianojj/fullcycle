package usecase

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/gateway"
)

type (
	CreateAccount struct {
		clienteGateway gateway.ClientGateway
		accountGateway gateway.AccountGateway
	}
	CreateAccountInput struct {
		ClientID string `json:"client_id"`
	}
	CreateAccountOutput struct {
		ID      string  `json:"id"`
		Balance float64 `json:"balance"`
	}
)

func NewCreateAccount(
	clientGateway gateway.ClientGateway,
	accountGateway gateway.AccountGateway,
) *CreateAccount {
	return &CreateAccount{
		clientGateway,
		accountGateway,
	}
}

func (c *CreateAccount) Execute(ctx context.Context, input *CreateAccountInput) (*CreateAccountOutput, error) {
	client, err := c.clienteGateway.Find(ctx, input.ClientID)
	if err != nil {
		return nil, err
	}
	account, err := entity.NewAccount(client)
	if err != nil {
		return nil, err
	}
	if err := c.accountGateway.Save(ctx, account); err != nil {
		return nil, err
	}
	return &CreateAccountOutput{
		ID:      account.ID,
		Balance: account.Balance,
	}, nil
}
