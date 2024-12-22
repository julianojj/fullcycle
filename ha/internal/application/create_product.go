package application

import (
	"ae/internal/application/ports"
	"context"
	"errors"
	"log/slog"

	"github.com/google/uuid"
)

type (
	CreateProduct struct {
		productRepository  ports.ProductRepository
		categoryRepository ports.CategoryRepository
	}
	CreateProductRequest struct {
		Name     string  `json:"name"`
		Category string  `json:"category"`
		Price    float64 `json:"price"`
		Quantity int     `json:"quantity"`
	}
	CreateProductResponse struct {
		ID string `json:"id"`
	}
)

func NewCreateProduct(productRepository ports.ProductRepository, categoryRepository ports.CategoryRepository) *CreateProduct {
	return &CreateProduct{
		productRepository,
		categoryRepository,
	}
}

func (cp *CreateProduct) Execute(ctx context.Context, request *CreateProductRequest) (*CreateProductResponse, error) {
	category, err := cp.categoryRepository.FindByName(ctx, request.Category)
	if err != nil {
		slog.ErrorContext(
			ctx,
			"error finding category",
			slog.Any("category", request.Category),
		)
		return nil, err
	}
	if category == nil {
		slog.ErrorContext(
			ctx,
			"category not found",
			slog.Any("category", request.Category),
		)
		return nil, errors.New("category not found")
	}
	product := &ports.Product{
		ID:         uuid.NewString(),
		Name:       request.Name,
		CategoryID: category.ID,
		Price:      request.Price,
		Quantity:   request.Quantity,
	}
	if err := cp.productRepository.Save(ctx, product); err != nil {
		slog.ErrorContext(
			ctx,
			"error saving product",
			slog.Any("product", product),
		)
		return nil, err
	}
	slog.InfoContext(
		ctx,
		"product saved",
		slog.Any("product", product),
	)
	return &CreateProductResponse{ID: product.ID}, nil
}
