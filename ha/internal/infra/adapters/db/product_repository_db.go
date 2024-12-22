package db

import (
	"ae/internal/application/ports"
	"context"
	"database/sql"
	"log/slog"
)

type (
	ProductRepositoryDb struct {
		db *sql.DB
	}
)

func NewProductRepositoryDb(db *sql.DB) ports.ProductRepository {
	return &ProductRepositoryDb{db}
}

func (pr *ProductRepositoryDb) Save(ctx context.Context, product *ports.Product) error {
	query := "INSERT INTO products (id, name, categoryid, price, quantity) VALUES ($1, $2, $3, $4, $5)"
	stmt, err := pr.db.PrepareContext(ctx, query)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(ctx, product.ID, product.Name, product.CategoryID, product.Price, product.Quantity)
	if err != nil {
		return err
	}
	slog.InfoContext(
		ctx,
		"success to get product in database",
		slog.Any("product", product),
	)
	return nil
}

func (pr *ProductRepositoryDb) FindByID(ctx context.Context, id string) (*ports.Product, error) {
	query := "SELECT id, name, categoryid, price, quantity FROM products WHERE id = $1"
	stmt, err := pr.db.PrepareContext(ctx, query)
	if err != nil {
		return nil, err
	}
	row := stmt.QueryRowContext(ctx, id)
	var product ports.Product
	if err := row.Scan(&product.ID, &product.Name, &product.CategoryID, &product.Price, &product.Quantity); err != nil {
		return nil, err
	}
	slog.InfoContext(
		ctx,
		"success to get product in database",
		slog.Any("product", product),
	)
	return &product, nil
}

func (pr *ProductRepositoryDb) Clean(ctx context.Context) error {
	query := "DELETE FROM products"
	_, err := pr.db.ExecContext(ctx, query)
	if err != nil {
		return err
	}
	return nil
}
