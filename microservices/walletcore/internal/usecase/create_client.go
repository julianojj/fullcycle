package usecase

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/gateway"
)

type (
	CreateClient struct {
		clientGateway gateway.ClientGateway
	}
	CreateClientInput struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}
	CreateClientOutput struct {
		ID string `json:"id"`
	}
)

func NewCreateClient(clientGateway gateway.ClientGateway) *CreateClient {
	return &CreateClient{
		clientGateway,
	}
}

func (c *CreateClient) Execute(ctx context.Context, input *CreateClientInput) (*CreateClientOutput, error) {
	client, err := entity.NewClient(input.Name, input.Email)
	if err != nil {
		return nil, err
	}
	if err := c.clientGateway.Save(ctx, client); err != nil {
		return nil, err
	}
	return &CreateClientOutput{
		ID: client.ID,
	}, nil
}
