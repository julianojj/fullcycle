package gateways

import (
	"ae/internal/application/ports"
	"context"
	"fmt"
	"github.com/google/uuid"
)

type Pagarme struct{}

func NewPagarme() ports.PaymentRepository {
	return &Pagarme{}
}

func (p *Pagarme) CreatePayment(ctx context.Context, payment *ports.Payment) (*ports.CreatePaymentOutput, error) {
	input := map[string]any{
		"api_key":              "SUA_API_KEY",
		"card_number":          payment.Card.Number,
		"card_cvv":             payment.Card.CVV,
		"card_holder_name":     payment.Card.HolderName,
		"card_expiration_date": payment.Card.Expiration,
		"customer": map[string]any{
			"email":           payment.Customer.Email,
			"name":            payment.Customer.Name,
			"document_number": payment.Customer.Document,
			"address": map[string]any{
				"zipcode":       payment.Customer.Address.Zipcode,
				"neighborhood":  payment.Customer.Address.Neighborhood,
				"street":        payment.Customer.Address.Street,
				"street_number": payment.Customer.Address.Number,
			},
			"phone": map[string]any{
				"number": payment.Customer.Phone.Number,
				"ddd":    payment.Customer.Phone.DDD,
			},
		},
		"capture":        true,
		"async":          false,
		"installments":   payment.Installments,
		"payment_method": payment.PaymentMethod,
		"amount":         payment.Amount,
		"postback_url":   "https://SUA_POSTBACK_URL",
	}
	fmt.Println(input)
	return &ports.CreatePaymentOutput{
		TID:           uuid.NewString(),
		PaidAmount:    payment.Amount,
		Installments:  payment.Installments,
		PaymentMethod: payment.PaymentMethod,
		AcquirerCode:  "0000",
		Status:        "paid",
		IP:            "127.0.0.1",
	}, nil
}
