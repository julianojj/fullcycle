package ports

import "context"

type (
	PaymentRepository interface {
		CreatePayment(ctx context.Context, payment *Payment) (*CreatePaymentOutput, error)
	}
	CreatePaymentOutput struct {
		TID           string
		PaidAmount    int
		Installments  int
		PaymentMethod string
		AcquirerCode  string
		Status        string
		IP            string
	}
	Card struct {
		HolderName string
		Number     string
		Expiration string
		CVV        string
	}
	Address struct {
		Zipcode      string
		Street       string
		Number       string
		Neighborhood string
	}
	Customer struct {
		Name     string
		Document string
		Email    string
		Phone    *Phone
		Address  *Address
	}
	Phone struct {
		Number string
		DDD    string
	}
	Payment struct { // Payment should based on pagar.me
		ID            string
		Amount        int
		Installments  int
		PaymentMethod string
		Card          *Card
		Customer      *Customer
	}
)
