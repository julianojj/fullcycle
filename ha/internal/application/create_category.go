package application

import (
	"ae/internal/application/ports"
	"context"
	"github.com/google/uuid"
)

type (
	CreateCategory struct {
		categoryRepository ports.CategoryRepository
	}
	CreateCategoryRequest struct {
		Name string `json:"name"`
	}
	CreateCategoryResponse struct {
		ID string `json:"id"`
	}
)

func NewCreateCategory(categoryRepository ports.CategoryRepository) *CreateCategory {
	return &CreateCategory{
		categoryRepository,
	}
}

func (cc *CreateCategory) Execute(ctx context.Context, input *CreateCategoryRequest) (*CreateCategoryResponse, error) {
	category := &ports.Category{
		ID:   uuid.NewString(),
		Name: input.Name,
	}
	if err := cc.categoryRepository.Save(ctx, category); err != nil {
		return nil, err
	}
	return &CreateCategoryResponse{ID: category.ID}, nil
}
