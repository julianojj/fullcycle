package cli

import (
	"ae/internal/application"
	"ae/internal/infra/adapters"
	"context"
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestCliCreateProduct(t *testing.T) {
	ctx := context.Background()
	productRepository := adapters.NewProductRepositoryMemory()
	categoryRepository := adapters.NewCategoryRepositoryMemory()
	application.NewCreateCategory(categoryRepository).Execute(ctx, &application.CreateCategoryRequest{Name: "Category 1"})
	createProduct := application.NewCreateProduct(productRepository, categoryRepository)
	getProduct := application.NewGetProduct(productRepository, categoryRepository)
	input := &application.CreateProductRequest{
		Name:     "Product 1",
		Category: "Category 1",
		Price:    100,
		Quantity: 10,
	}
	result, err := Run(ctx, createProduct, getProduct, "create", input, "")
	assert.NoError(t, err)
	assert.Equal(t, "Success to create product Product 1", result)
}

func TestCliGetProduct(t *testing.T) {
	ctx := context.Background()
	productRepository := adapters.NewProductRepositoryMemory()
	categoryRepository := adapters.NewCategoryRepositoryMemory()
	application.NewCreateCategory(categoryRepository).Execute(ctx, &application.CreateCategoryRequest{Name: "Category 1"})
	createProduct := application.NewCreateProduct(productRepository, categoryRepository)
	getProduct := application.NewGetProduct(productRepository, categoryRepository)
	input := &application.CreateProductRequest{
		Name:     "Product 1",
		Category: "Category 1",
		Price:    100,
		Quantity: 10,
	}
	output, err := createProduct.Execute(ctx, input)
	assert.NoError(t, err)
	result, err := Run(ctx, createProduct, getProduct, "get", nil, output.ID)
	assert.NoError(t, err)
	assert.Equal(t, fmt.Sprintf("Product ID: %s\nName: %s\nCategory: %s\nPrice: %.2f\nQuantity: %d", output.ID, input.Name, input.Category, input.Price, input.Quantity), result)
}
