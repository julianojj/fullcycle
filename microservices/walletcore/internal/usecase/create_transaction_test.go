package usecase

import (
	"context"
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateTransaction(t *testing.T) {
	ctx := context.Background()
	clientFrom, _ := entity.NewClient("Jhon Doe", "jhon.doe@test.com")
	accountFrom, _ := entity.NewAccount(clientFrom)
	accountFrom.Credit(1000)
	clientTo, _ := entity.NewClient("Jhon Doe 2", "jhon.doe2@test.com")
	accountTo, _ := entity.NewAccount(clientTo)
	accountTo.Credit(0)
	accountRepository := repository.NewAccountRepositoryMock()
	transactionRepository := repository.NewTransactionRepositoryMock()
	createTransaction := NewCreateTransaction(accountRepository, transactionRepository)
	input := &CreateTransactionInput{
		AccountFrom: accountFrom.ID,
		AccountTo:   accountTo.ID,
		Amount:      100,
	}
	accountRepository.On("Find", ctx, accountFrom.ID).Once().Return(accountFrom, nil)
	accountRepository.On("Find", ctx, accountTo.ID).Once().Return(accountTo, nil)
	transactionRepository.On("Create", ctx, mock.Anything).Return(nil)
	output, _ := createTransaction.Execute(ctx, input)
	assert.NotNil(t, output.ID)
	assert.Equal(t, input.Amount, output.Amount)
	assert.Equal(t, 900.00, accountFrom.Balance)
	assert.Equal(t, 100.00, accountTo.Balance)
	accountRepository.AssertExpectations(t)
	accountRepository.AssertNumberOfCalls(t, "Find", 2)
	transactionRepository.AssertExpectations(t)
	transactionRepository.AssertNumberOfCalls(t, "Create", 1)
}
