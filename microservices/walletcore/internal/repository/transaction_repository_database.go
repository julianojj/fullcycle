package repository

import (
	"context"
	"database/sql"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type TransactionRepositoryDatabase struct {
	db *sql.DB
}

func NewTransactionRepositoryDatabase(db *sql.DB) *TransactionRepositoryDatabase {
	return &TransactionRepositoryDatabase{
		db,
	}
}

func (t *TransactionRepositoryDatabase) Create(ctx context.Context, transaction *entity.Transaction) error {
	_, err := t.db.ExecContext(
		ctx, `
			INSERT INTO Transactions(Id, AccountFromId, AccountToId, Amount, CreatedAt)
			VALUES($1, $2, $3, $4, $5)
		`,
		transaction.ID,
		transaction.AccountFrom.ID,
		transaction.AccountTo.ID,
		transaction.Amount,
		transaction.CreatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}
