package repository

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/stretchr/testify/mock"
)

type TransactionRepositoryMock struct {
	mock.Mock
}

func NewTransactionRepositoryMock() *TransactionRepositoryMock {
	return &TransactionRepositoryMock{}
}

func (t *TransactionRepositoryMock) Create(ctx context.Context, transaction *entity.Transaction) error {
	args := t.Called(ctx, transaction)
	return args.Error(0)
}
