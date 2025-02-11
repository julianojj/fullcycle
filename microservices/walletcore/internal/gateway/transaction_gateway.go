package gateway

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type TransactionGateway interface {
	Create(ctx context.Context, transaction *entity.Transaction) error
}
