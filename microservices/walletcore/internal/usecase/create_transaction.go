package usecase

import (
	"context"

	"github.com/julianojj/fullcycle/eda/pkg/events"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/gateway"
	"github.com/julianojj/fullcycle/microservices/walletcore/pkg/uow"
)

type (
	CreateTransaction struct {
		uow                uow.UowInterface
		publisher          events.Publisher
		transactionCreated events.Event
		balanceUpdated     events.Event
	}
	CreateTransactionInput struct {
		AccountFrom string  `json:"account_from"`
		AccountTo   string  `json:"account_to"`
		Amount      float64 `json:"amount"`
	}
	CreateTransactionOutput struct {
		ID     string  `json:"id"`
		Amount float64 `json:"amount"`
	}
	BalanceUpdatedOutput struct {
		AccountIDFrom        string  `json:"account_from"`
		AccountIDTo          string  `json:"account_to"`
		BalanceAccountIDFrom float64 `json:"balance_account_from"`
		BalanceAccountIDTo   float64 `json:"balance_account_to"`
	}
)

func NewCreateTransaction(
	uow uow.UowInterface,
	publisher events.Publisher,
	transactionCreated events.Event,
	balanceUpdated events.Event,
) *CreateTransaction {
	return &CreateTransaction{
		uow,
		publisher,
		transactionCreated,
		balanceUpdated,
	}
}

func (c *CreateTransaction) Execute(ctx context.Context, input *CreateTransactionInput) (*CreateTransactionOutput, error) {
	var (
		output               *CreateTransactionOutput
		balanceUpdatedOutput *BalanceUpdatedOutput
	)
	err := c.uow.Do(ctx, func(uow *uow.Uow) error {
		accountRepository, err := c.getAccountRepository(ctx)
		if err != nil {
			return err
		}
		transactionRepository, err := c.getTransactionRepository(ctx)
		if err != nil {
			return err
		}
		accountFrom, err := accountRepository.Find(ctx, input.AccountFrom)
		if err != nil {
			return err
		}
		accountTo, err := accountRepository.Find(ctx, input.AccountTo)
		if err != nil {
			return err
		}
		transaction, err := entity.NewTransaction(accountFrom, accountTo, input.Amount)
		if err != nil {
			return err
		}
		if err := transactionRepository.Create(ctx, transaction); err != nil {
			return err
		}

		if err := accountRepository.Update(ctx, accountFrom); err != nil {
			return err
		}

		if err := accountRepository.Update(ctx, accountTo); err != nil {
			return err
		}

		balanceUpdatedOutput = &BalanceUpdatedOutput{
			AccountIDFrom:        input.AccountFrom,
			AccountIDTo:          input.AccountTo,
			BalanceAccountIDFrom: accountFrom.Balance,
			BalanceAccountIDTo:   accountTo.Balance,
		}

		output = &CreateTransactionOutput{
			ID:     transaction.ID,
			Amount: transaction.Amount,
		}
		return nil
	})
	if err != nil {
		return nil, err
	}
	c.transactionCreated.SetPayload(output)
	c.balanceUpdated.SetPayload(balanceUpdatedOutput)
	c.publisher.Notify("TransactionCreatedKafkaHandler", c.transactionCreated)
	c.publisher.Notify("UpdateBalanceKafkaHandler", c.balanceUpdated)
	return output, nil
}

func (c *CreateTransaction) getAccountRepository(ctx context.Context) (gateway.AccountGateway, error) {
	output, err := c.uow.GetRepository(ctx, "AccountRepository")
	if err != nil {
		return nil, err
	}
	return output.(gateway.AccountGateway), nil
}

func (c *CreateTransaction) getTransactionRepository(ctx context.Context) (gateway.TransactionGateway, error) {
	output, err := c.uow.GetRepository(ctx, "TransactionRepository")
	if err != nil {
		return nil, err
	}
	return output.(gateway.TransactionGateway), nil
}
