package adapters

import (
	"ae/internal/application/ports"
	"context"
)

type ProductRepositoryMemory struct {
	Products []*ports.Product
}

func NewProductRepositoryMemory() ports.ProductRepository {
	return &ProductRepositoryMemory{}
}

func (pr *ProductRepositoryMemory) Save(ctx context.Context, Product *ports.Product) error {
	pr.Products = append(pr.Products, Product)
	return nil
}

func (pr *ProductRepositoryMemory) FindByID(ctx context.Context, id string) (*ports.Product, error) {
	for _, product := range pr.Products {
		if product.ID == id {
			return product, nil
		}
	}
	return nil, nil
}

func (pr *ProductRepositoryMemory) Clean(ctx context.Context) error {
	pr.Products = []*ports.Product{}
	return nil
}
