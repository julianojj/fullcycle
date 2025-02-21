package usecase

import (
	"context"
	"testing"

	"github.com/julianojj/fullcycle/eda/pkg/events"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/event"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/repository"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/uow"
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
	transactionCreated := event.NewTransactionCreatedEvent()
	balanceUpdated := event.NewBalanceUpdatedEvent()
	publisher := new(events.PublisherDispatch)
	uowork := uow.NewUowMock()
	uowork.On("Do", mock.Anything, mock.Anything).Return(nil)

	createTransaction := NewCreateTransaction(uowork, publisher, transactionCreated, balanceUpdated)
	input := &CreateTransactionInput{
		AccountFrom: accountFrom.ID,
		AccountTo:   accountTo.ID,
		Amount:      100,
	}
	accountRepository.On("Find", ctx, accountFrom.ID).Once().Return(accountFrom, nil)
	accountRepository.On("Find", ctx, accountTo.ID).Once().Return(accountTo, nil)
	transactionRepository.On("Create", ctx, mock.Anything).Return(nil)
	accountRepository.On("Update", ctx, mock.Anything).Return(nil)
	createTransaction.Execute(ctx, input)
	uowork.AssertExpectations(t)
	uowork.AssertNumberOfCalls(t, "Do", 1)
}
