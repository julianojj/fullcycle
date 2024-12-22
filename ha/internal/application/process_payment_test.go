package application

import (
	"ae/internal/application/ports"
	"ae/internal/infra/adapters/gateways"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestProcessPayment_Pay(t *testing.T) {
	pagarme := gateways.NewPagarme()
	processPayment := NewProcessPayment(pagarme)
	input := &ports.Payment{
		ID:            "1",
		Amount:        10000,
		Installments:  1,
		PaymentMethod: "credit_card",
		Card: &ports.Card{
			HolderName: "Jane Smith",
			Number:     "4111111111111111",
			Expiration: "1224",
			CVV:        "456",
		},
		Customer: &ports.Customer{
			Name:     "Jane Smith",
			Document: "98765432100",
			Email:    "jane.smith@test.com",
			Phone: &ports.Phone{
				Number: "888888888",
				DDD:    "22",
			},
			Address: &ports.Address{
				Zipcode:      "87654321",
				Street:       "Avenida Exemplo",
				Number:       "456",
				Neighborhood: "Bairro Exemplo",
			},
		},
	}
	output, err := processPayment.Execute(nil, input)
	assert.NoError(t, err)
	assert.NotNil(t, output)
}
