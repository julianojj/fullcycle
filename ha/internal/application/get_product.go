package application

import (
	"ae/internal/application/ports"
	"context"
	"errors"
	"log/slog"
)

type (
	GetProduct struct {
		productRepository  ports.ProductRepository
		categoryRepository ports.CategoryRepository
	}
	GetProductOutput struct {
		ID       string
		Name     string
		Category string
		Price    float64
		Quantity int
	}
)

func NewGetProduct(productRepository ports.ProductRepository, categoryRepository ports.CategoryRepository) *GetProduct {
	return &GetProduct{
		productRepository:  productRepository,
		categoryRepository: categoryRepository,
	}
}

func (g *GetProduct) Execute(ctx context.Context, productID string) (*GetProductOutput, error) {
	product, err := g.productRepository.FindByID(ctx, productID)
	if err != nil {
		slog.ErrorContext(
			ctx,
			"error finding product",
			slog.Any("product_id", productID),
		)
		return nil, err
	}
	if product == nil {
		slog.ErrorContext(
			ctx,
			"product not found",
			slog.Any("product_id", productID),
		)
		return nil, errors.New("product not found")
	}
	category, err := g.categoryRepository.FindByID(ctx, product.CategoryID)
	if err != nil {
		slog.ErrorContext(
			ctx,
			"error finding category",
			slog.Any("category_id", product.CategoryID),
		)
		return nil, err
	}
	if category == nil {
		slog.ErrorContext(
			ctx,
			"category not found",
			slog.Any("category_id", product.CategoryID),
		)
		return nil, errors.New("category not found")
	}
	return &GetProductOutput{
		ID:       product.ID,
		Name:     product.Name,
		Category: category.Name,
		Price:    product.Price,
		Quantity: product.Quantity,
	}, nil
}
