package application

import (
	"ae/internal/infra/adapters/db"
	"context"
	"database/sql"
	"testing"

	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
)

func TestCreateProduct_Execute(t *testing.T) {
	ctx := context.Background()
	conn, err := sql.Open("postgres", "postgres://juliano:12345678@localhost:5432/fullcycle?sslmode=disable")
	if err != nil {
		panic(err)
	}
	productRepository := db.NewProductRepositoryDb(conn)
	categoryRepository := db.NewCategoryRepositoryDb(conn)
	createCategory := NewCreateCategory(categoryRepository)
	categoryOutput, err := createCategory.Execute(ctx, &CreateCategoryRequest{Name: "category"})
	createProduct := NewCreateProduct(productRepository, categoryRepository)
	input := &CreateProductRequest{
		Name:     "product",
		Category: "category",
		Price:    10.99,
		Quantity: 100,
	}
	output, err := createProduct.Execute(ctx, input)
	assert.NoError(t, err)
	assert.NotEmpty(t, output.ID)
	product, _ := productRepository.FindByID(ctx, output.ID)
	assert.Equal(t, input.Name, product.Name)
	assert.Equal(t, categoryOutput.ID, product.CategoryID)
	productRepository.Clean(ctx)
	categoryRepository.Clean(ctx)
}
