package application

import (
	"ae/internal/application/ports"
	"context"
)

type (
	ProcessPayment struct {
		paymentRepository ports.PaymentRepository
	}
)

func NewProcessPayment(paymentRepository ports.PaymentRepository) *ProcessPayment {
	return &ProcessPayment{paymentRepository}
}

func (pp *ProcessPayment) Execute(ctx context.Context, payment *ports.Payment) (*ports.CreatePaymentOutput, error) {
	return pp.paymentRepository.CreatePayment(ctx, payment)
}
