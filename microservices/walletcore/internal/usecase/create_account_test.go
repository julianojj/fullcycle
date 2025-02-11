package usecase

import (
	"context"
	"testing"
	"time"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateAccount(t *testing.T) {
	ctx := context.Background()
	clientRepository := repository.NewClientRepositoryMock()
	accountRepository := repository.NewAccountRepositoryMock()
	now := time.Now().UTC()
	mockedClient := &entity.Client{
		ID:        "1",
		Name:      "John Doe",
		Email:     "john.doe@test.com",
		CreatedAt: now,
		UpdatedAt: now,
	}
	clientRepository.On("Find", ctx, "1").Return(mockedClient, nil)
	createAccount := NewCreateAccount(clientRepository, accountRepository)
	mockedAccount := &entity.Account{
		ID:        mock.Anything,
		Client:    mockedClient,
		Balance:   0,
		CreatedAt: now,
		UpdatedAt: now,
	}
	input := &CreateAccountInput{
		ClientID: "1",
	}
	accountRepository.On("Save", ctx, mock.Anything).Return(nil)
	output, _ := createAccount.Execute(ctx, input)
	assert.NotEmpty(t, output.ID)
	assert.Equal(t, output.Balance, 0.0)
	accountRepository.On("Find", ctx, output.ID).Return(mockedAccount, nil)
	account, _ := accountRepository.Find(ctx, output.ID)
	assert.Equal(t, mockedClient, account.Client)
}
