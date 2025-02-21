package repository

import (
	"context"

	"github.com/julianojj/fullcycle/microservices/balance/internal/gateway"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type BalanceRepositoryDatabase struct {
	client *mongo.Client
}

var _ gateway.BalanceGateway = (*BalanceRepositoryDatabase)(nil)

func NewBalanceRepositoryDatabase() *BalanceRepositoryDatabase {
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI("mongodb://juliano:12345678@mongodb:27017").SetServerAPIOptions(serverAPI)
	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	return &BalanceRepositoryDatabase{
		client,
	}
}

func (r *BalanceRepositoryDatabase) Save(ctx context.Context, balance *gateway.Balance) error {
	collection := r.client.Database("fullcycle").Collection("balances")
	filter := bson.M{"accountid": balance.AccountID}
	update := bson.M{
		"$set": bson.M{
			"amount": balance.Amount,
		},
	}
	_, err := collection.UpdateOne(ctx, filter, update, options.UpdateOne().SetUpsert(true))
	if err != nil {
		return err
	}
	return nil
}

func (r *BalanceRepositoryDatabase) Get(ctx context.Context, accountID string) (*gateway.Balance, error) {
	collection := r.client.Database("fullcycle").Collection("balances")
	filter := bson.M{"accountid": accountID}
	result := &gateway.Balance{}
	err := collection.FindOne(ctx, filter).Decode(result)
	if err != nil {
		return nil, err
	}
	return result, nil
}
