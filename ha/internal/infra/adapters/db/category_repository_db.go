package db

import (
	"ae/internal/application/ports"
	"context"
	"database/sql"
	"log/slog"
)

type CategoryRepositoryDb struct {
	db *sql.DB
}

func NewCategoryRepositoryDb(db *sql.DB) ports.CategoryRepository {
	return &CategoryRepositoryDb{db}
}

func (cdb *CategoryRepositoryDb) Save(ctx context.Context, category *ports.Category) error {
	query := "INSERT INTO categories (id, name) VALUES ($1, $2)"
	stmt, err := cdb.db.PrepareContext(ctx, query)
	if err != nil {
		return err
	}
	_, err = stmt.ExecContext(ctx, category.ID, category.Name)
	if err != nil {
		return err
	}
	slog.InfoContext(
		ctx,
		"success to save category in database",
		slog.Any("category", category),
	)
	return nil
}

func (cdb *CategoryRepositoryDb) FindByID(ctx context.Context, id string) (*ports.Category, error) {
	query := "SELECT id, name FROM categories WHERE id = $1"
	stmt, err := cdb.db.PrepareContext(ctx, query)
	if err != nil {
		return nil, err
	}
	row := stmt.QueryRowContext(ctx, id)
	var category ports.Category
	if err := row.Scan(&category.ID, &category.Name); err != nil {
		return nil, err
	}
	slog.InfoContext(
		ctx,
		"success to get category in database",
		slog.Any("category", category),
	)
	return &category, nil
}

func (cdb *CategoryRepositoryDb) FindByName(ctx context.Context, name string) (*ports.Category, error) {
	query := "SELECT id, name FROM categories WHERE name = $1"
	stmt, err := cdb.db.PrepareContext(ctx, query)
	if err != nil {
		return nil, err
	}
	row := stmt.QueryRowContext(ctx, name)
	var category ports.Category
	if err := row.Scan(&category.ID, &category.Name); err != nil {
		return nil, err
	}
	slog.InfoContext(
		ctx,
		"success to get category in database",
		slog.Any("category", category),
	)
	return &category, nil
}

func (cdb *CategoryRepositoryDb) Clean(ctx context.Context) error {
	query := "DELETE FROM categories"
	_, err := cdb.db.ExecContext(ctx, query)
	if err != nil {
		return err
	}
	return nil
}
