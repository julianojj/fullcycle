package repository

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/stretchr/testify/mock"
)

type AccountRepositoryMock struct {
	mock.Mock
}

func NewAccountRepositoryMock() *AccountRepositoryMock {
	return &AccountRepositoryMock{}
}

func (a *AccountRepositoryMock) Save(ctx context.Context, account *entity.Account) error {
	args := a.Called(ctx, account)
	return args.Error(0)
}

func (a *AccountRepositoryMock) Find(ctx context.Context, id string) (*entity.Account, error) {
	args := a.Called(ctx, id)
	return args.Get(0).(*entity.Account), args.Error(1)
}


func (a *AccountRepositoryMock) Update(ctx context.Context, account *entity.Account) error {
    args := a.Called(ctx, account)
    return args.Error(0)
}
