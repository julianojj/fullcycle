package application

import (
	"ae/internal/infra/adapters"
	"context"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestCreateCategory(t *testing.T) {
	categoryRepository := adapters.NewCategoryRepositoryMemory()
	createCategory := NewCreateCategory(categoryRepository)
	input := &CreateCategoryRequest{
		Name: "category",
	}
	ctx := context.Background()
	output, err := createCategory.Execute(ctx, input)
	assert.Nil(t, err)
	category, _ := categoryRepository.FindByName(ctx, input.Name)
	assert.Equal(t, input.Name, category.Name)
	assert.Equal(t, output.ID, category.ID)
	categoryRepository.Clean(ctx)
}
