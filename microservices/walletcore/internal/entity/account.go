package entity

import (
	"time"

	"github.com/google/uuid"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/exception"
)

type Account struct {
	ID        string
	Client    *Client
	Balance   float64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewAccount(client *Client) (*Account, error) {
	now := time.Now().UTC()
	account := &Account{
		ID:        uuid.NewString(),
		Client:    client,
		Balance:   0,
		CreatedAt: now,
		UpdatedAt: now,
	}
	if err := account.Validate(); err != nil {
		return nil, err
	}
	return account, nil
}

func (a *Account) Validate() error {
	if a.Client == nil {
		return exception.ErrClientIsRequired
	}
	return nil
}

func (a *Account) Credit(amount float64) error {
	if amount < 0 {
		return exception.ErrInvalidAmount
	}
	a.Balance += amount
	a.UpdatedAt = time.Now().UTC()
	return nil
}

func (a *Account) Debit(amount float64) error {
	if amount < 0 {
		return exception.ErrInvalidAmount
	}
	if a.Balance < amount {
		return exception.ErrInsufficientBalance
	}
	a.Balance -= amount
	a.UpdatedAt = time.Now().UTC()
	return nil
}
