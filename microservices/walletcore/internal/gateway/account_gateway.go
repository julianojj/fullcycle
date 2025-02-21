package gateway

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type AccountGateway interface {
	Save(ctx context.Context, account *entity.Account) error
	Find(ctx context.Context, id string) (*entity.Account, error)
	Update(ctx context.Context, account *entity.Account) error
}
