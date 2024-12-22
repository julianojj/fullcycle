package ports

import (
	"context"
)

type (
	CategoryRepository interface {
		Save(ctx context.Context, category *Category) error
		FindByID(ctx context.Context, id string) (*Category, error)
		FindByName(ctx context.Context, name string) (*Category, error)
		Clean(ctx context.Context) error
	}
	Category struct {
		ID   string
		Name string
	}
)
