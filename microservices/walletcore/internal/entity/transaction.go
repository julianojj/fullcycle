package entity

import (
	"time"

	"github.com/google/uuid"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/exception"
)

type Transaction struct {
	ID          string
	AccountFrom *Account
	AccountTo   *Account
	Amount      float64
	CreatedAt   time.Time
}

func NewTransaction(accountFrom *Account, accountTo *Account, amount float64) (*Transaction, error) {
	transaction := &Transaction{
		ID:          uuid.NewString(),
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      amount,
		CreatedAt:   time.Now().UTC(),
	}
	if err := transaction.Validate(); err != nil {
		return nil, err
	}
	transaction.Transfer()
	return transaction, nil
}

func (t *Transaction) Validate() error {
	if t.Amount < 0 {
		return exception.ErrInvalidAmount
	}
	if t.AccountFrom.Balance < t.Amount {
		return exception.ErrInsufficientBalance
	}
	return nil
}

func (t *Transaction) Transfer() {
	t.AccountFrom.Debit(t.Amount)
	t.AccountTo.Credit(t.Amount)
}
