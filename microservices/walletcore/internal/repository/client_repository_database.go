package repository

import (
	"context"
	"database/sql"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type ClientRepositoryDatabase struct {
	db *sql.DB
}

func NewClientRepositoryDatabase(db *sql.DB) *ClientRepositoryDatabase {
	return &ClientRepositoryDatabase{
		db,
	}
}

func (c *ClientRepositoryDatabase) Save(ctx context.Context, client *entity.Client) error {
	stmt, err := c.db.PrepareContext(ctx, `
		INSERT INTO clients (id, name, email, createdAt, updatedAt)
		VALUES ($1, $2, $3, $4, $5)
	`)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(
		ctx,
		client.ID,
		client.Name,
		client.Email,
		client.CreatedAt,
		client.UpdatedAt,
	)
	if err != nil {
		return err
	}
	return nil
}

func (c *ClientRepositoryDatabase) Find(ctx context.Context, id string) (*entity.Client, error) {
	var client entity.Client
	if err := c.db.
		QueryRowContext(ctx,
			`
				SELECT id,
				name,
				email,
				createdAt,
				updatedAt
				FROM clients
				WHERE id = $1`,
			id,
		).Scan(
		&client.ID,
		&client.Name,
		&client.Email,
		&client.CreatedAt,
		&client.UpdatedAt,
	); err != nil {
		return nil, err
	}
	return &client, nil
}
