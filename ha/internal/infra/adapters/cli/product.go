package cli

import (
	"ae/internal/application"
	"context"
	"fmt"
)

func Run(ctx context.Context, createProduct *application.CreateProduct, getProduct *application.GetProduct, action string, input *application.CreateProductRequest, productID string) (string, error) {
	var result = ""
	switch action {
	case "create":
		_, err := createProduct.Execute(ctx, input)
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("Success to create product %s", input.Name)
	case "get":
		output, err := getProduct.Execute(ctx, productID)
		if err != nil {
			return "", err
		}
		result = fmt.Sprintf("Product ID: %s\nName: %s\nCategory: %s\nPrice: %.2f\nQuantity: %d", output.ID, output.Name, output.Category, output.Price, output.Quantity)
	default:
		return "", nil
	}
	return result, nil
}
