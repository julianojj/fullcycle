package repository

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/stretchr/testify/mock"
)

type ClientRepositoryMock struct {
	mock.Mock
}

func NewClientRepositoryMock() *ClientRepositoryMock {
	return &ClientRepositoryMock{}
}

func (c *ClientRepositoryMock) Save(ctx context.Context, client *entity.Client) error {
	args := c.Called(ctx, client)
	return args.Error(0)
}

func (c *ClientRepositoryMock) Find(ctx context.Context, id string) (*entity.Client, error) {
	args := c.Called(ctx, id)
	return args.Get(0).(*entity.Client), args.Error(1)
}
