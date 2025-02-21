package repository

import (
	"context"
	"database/sql"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type AccountRepositoryDatabase struct {
	db *sql.DB
}

func NewAccountRepositoryDatabase(db *sql.DB) *AccountRepositoryDatabase {
	return &AccountRepositoryDatabase{
		db,
	}
}

func (a *AccountRepositoryDatabase) Save(ctx context.Context, account *entity.Account) error {
	stmt, err := a.db.PrepareContext(ctx, `
		INSERT INTO accounts (id, clientId, balance, createdAt, updatedAt)
		VALUES ($1, $2, $3, $4, $5)
	`)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(
		ctx,
		account.ID,
		account.Client.ID,
		account.Balance,
		account.CreatedAt,
		account.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}

func (a *AccountRepositoryDatabase) Find(ctx context.Context, id string) (*entity.Account, error) {
	var (
		account entity.Account
		client  entity.Client
	)
	err := a.db.QueryRowContext(
		ctx,
		`
		SELECT
		Accounts.Id as AccountId,
		Accounts.Balance,
		Accounts.CreatedAt,
		Accounts.UpdatedAt,
		Clients.Id as ClientId,
		Clients.Name,
		Clients.Email,
		Clients.CreatedAt as ClientCreatedAt,
		Clients.UpdatedAt as ClientUpdatedAt
		FROM Accounts
		INNER JOIN Clients ON Clients.Id = Accounts.ClientId
		WHERE Accounts.Id = $1
		`,
		id,
	).Scan(
		&account.ID,
		&account.Balance,
		&account.CreatedAt,
		&account.UpdatedAt,
		&client.ID,
		&client.Name,
		&client.Email,
		&client.CreatedAt,
		&client.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}
	account.Client = &client
	return &account, nil
}

func (a *AccountRepositoryDatabase) Update(ctx context.Context, account *entity.Account) error {
	stmt, err := a.db.PrepareContext(ctx, `
        UPDATE Accounts
        SET balance = $1, updatedAt = $2
        WHERE Id = $3
    `)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(
		ctx,
		account.Balance,
		account.UpdatedAt,
		account.ID,
	)
	return err
}
