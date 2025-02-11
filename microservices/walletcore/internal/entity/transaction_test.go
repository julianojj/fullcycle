package entity

import (
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/exception"
	"github.com/stretchr/testify/assert"
)

func TestNewTransactionShouldReturnErrorWhenAmountIsNegative(t *testing.T) {
	clientFrom, _ := NewClient("John Doe", "john.doe@test.com")
	clientTo, _ := NewClient("Jane Doe", "jane.doe@test.com")
	accountFrom, _ := NewAccount(clientFrom)
	accountTo, _ := NewAccount(clientTo)
	_, err := NewTransaction(accountFrom, accountTo, -100)
	assert.EqualError(t, err, exception.ErrInvalidAmount.Error())
}

func TestNewTransactionShouldReturnErrorWhenBalanceIsInsufficient(t *testing.T) {
	clientFrom, _ := NewClient("John Doe", "john.doe@test.com")
	clientTo, _ := NewClient("Jane Doe", "jane.doe@test.com")
	accountFrom, _ := NewAccount(clientFrom)
	accountTo, _ := NewAccount(clientTo)
	accountFrom.Credit(50)
	_, err := NewTransaction(accountFrom, accountTo, 100)
	assert.EqualError(t, err, exception.ErrInsufficientBalance.Error())
}

func TestNewTransactionShouldCreateTransactionSuccessfully(t *testing.T) {
	clientFrom, _ := NewClient("John Doe", "john.doe@test.com")
	clientTo, _ := NewClient("Jane Doe", "jane.doe@test.com")
	accountFrom, _ := NewAccount(clientFrom)
	accountTo, _ := NewAccount(clientTo)
	accountFrom.Credit(100)
	transaction, err := NewTransaction(accountFrom, accountTo, 50)
	assert.NoError(t, err)
	assert.NotEmpty(t, transaction.ID)
	assert.Equal(t, accountFrom, transaction.AccountFrom)
	assert.Equal(t, accountTo, transaction.AccountTo)
	assert.Equal(t, 50.0, transaction.Amount)
	assert.NotZero(t, transaction.CreatedAt)
	assert.Equal(t, 50.0, accountFrom.Balance)
	assert.Equal(t, 50.0, accountTo.Balance)
}
