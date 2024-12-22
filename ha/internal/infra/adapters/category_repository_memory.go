package adapters

import (
	"ae/internal/application/ports"
	"context"
)

type CategoryRepositoryMemory struct {
	Categories []*ports.Category
}

func NewCategoryRepositoryMemory() ports.CategoryRepository {
	return &CategoryRepositoryMemory{}
}

func (cr *CategoryRepositoryMemory) Save(ctx context.Context, category *ports.Category) error {
	cr.Categories = append(cr.Categories, category)
	return nil
}

func (cr *CategoryRepositoryMemory) FindByID(ctx context.Context, id string) (*ports.Category, error) {
	for _, category := range cr.Categories {
		if category.ID == id {
			return category, nil
		}
	}
	return nil, nil
}

func (cr *CategoryRepositoryMemory) FindByName(ctx context.Context, name string) (*ports.Category, error) {
	for _, category := range cr.Categories {
		if category.Name == name {
			return category, nil
		}
	}
	return nil, nil
}

func (cr *CategoryRepositoryMemory) Clean(ctx context.Context) error {
	cr.Categories = []*ports.Category{}
	return nil
}
