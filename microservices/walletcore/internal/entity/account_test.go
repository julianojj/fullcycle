package entity

import (
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/exception"
	"github.com/stretchr/testify/assert"
)

func TestAccountValidateShouldReturnErrorWhenClientIsNil(t *testing.T) {
	_, err := NewAccount(nil)
	assert.Equal(t, exception.ErrClientIsRequired, err)
}

func TestCreateNewAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, err := NewAccount(client)
	assert.NoError(t, err)
	assert.NotEmpty(t, account.ID)
	assert.Equal(t, client, account.Client)
	assert.Equal(t, 0.0, account.Balance)
	assert.NotZero(t, account.CreatedAt)
	assert.NotZero(t, account.UpdatedAt)
}

func TestCreditAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, _ := NewAccount(client)
	err := account.Credit(100)
	assert.NoError(t, err)
	assert.Equal(t, 100.0, account.Balance)
}

func TestDebitAccount(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, _ := NewAccount(client)
	account.Credit(100)
	err := account.Debit(50)
	assert.NoError(t, err)
	assert.Equal(t, 50.0, account.Balance)
}

func TestCreditAccountShouldReturnErrorWhenAmountIsNegative(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, _ := NewAccount(client)
	err := account.Credit(-100)
	assert.EqualError(t, err, "invalid amount")
}

func TestDebitAccountShouldReturnErrorWhenAmountIsNegative(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, _ := NewAccount(client)
	err := account.Debit(-100)
	assert.EqualError(t, err, "invalid amount")
}

func TestDebitAccountShouldReturnErrorWhenBalanceIsInsufficient(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	account, _ := NewAccount(client)
	account.Credit(100)
	err := account.Debit(150)
	assert.EqualError(t, err, "insufficient balance")
}
