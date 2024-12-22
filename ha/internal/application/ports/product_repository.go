package ports

import "context"

type (
	ProductRepository interface {
		Save(ctx context.Context, product *Product) error
		FindByID(ctx context.Context, id string) (*Product, error)
		Clean(ctx context.Context) error
	}
	Product struct {
		ID         string
		Name       string
		CategoryID string
		Price      float64
		Quantity   int
	}
)
