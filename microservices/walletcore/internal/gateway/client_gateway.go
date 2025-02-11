package gateway

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
)

type ClientGateway interface {
	Save(ctx context.Context, client *entity.Client) error
	Find(ctx context.Context, id string) (*entity.Client, error)
}
