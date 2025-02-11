package repository

import (
	"context"
	"database/sql"
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/stretchr/testify/suite"
)

type TransactionRepositoryDatabaseSuite struct {
	suite.Suite
	db                    *sql.DB
	ctx                   context.Context
	clientRepository      *ClientRepositoryDatabase
	accountRepository     *AccountRepositoryDatabase
	transactionRepository *TransactionRepositoryDatabase
}

func (s *TransactionRepositoryDatabaseSuite) SetupTest() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Require().Nil(err)
	s.db = db
	s.ctx = context.Background()

	s.db.Exec(`
		CREATE TABLE Clients(
			Id VARCHAR(36) PRIMARY KEY,
			Name VARCHAR(255) NOT NULL,
			Email VARCHAR(255) UNIQUE NOT NULL,
			CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)

	s.db.Exec(`
		CREATE TABLE Accounts(
			Id VARCHAR(36) PRIMARY KEY,
			ClientId VARCHAR(36) NOT NULL,
			Balance DECIMAL(10, 2) DEFAULT 0.00,
			CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (ClientId) REFERENCES Clients(Id)
		)
	`)

	s.db.Exec(`
	    CREATE TABLE Transactions(
            Id VARCHAR(36) PRIMARY KEY,
            AccountFromId VARCHAR(36) NOT NULL,
			AccountToId VARCHAR(36) NOT NULL,
            Amount DECIMAL(10, 2) NOT NULL,
			CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)

	s.clientRepository = NewClientRepositoryDatabase(db)
	s.accountRepository = NewAccountRepositoryDatabase(db)
	s.transactionRepository = NewTransactionRepositoryDatabase(db)
}

func (s *TransactionRepositoryDatabaseSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE Transactions")
	s.db.Exec("DROP TABLE Accounts")
	s.db.Exec("DROP TABLE Clients")
}

func (s *TransactionRepositoryDatabaseSuite) TestCreateTransaction() {
	clientFrom, _ := entity.NewClient("Jhon Doe", "jhon.doe@test.com")
	clientTo, _ := entity.NewClient("Jhon Doe 2", "jhon.doe2@test.com")
	s.clientRepository.Save(s.ctx, clientFrom)
	s.clientRepository.Save(s.ctx, clientTo)
	accountFrom, _ := entity.NewAccount(clientFrom)
	accountFrom.Credit(1000)
	accountTo, _ := entity.NewAccount(clientTo)
	s.accountRepository.Save(s.ctx, accountFrom)
	s.accountRepository.Save(s.ctx, accountTo)
	transaction, _ := entity.NewTransaction(accountFrom, accountTo, 1000)
	err := s.transactionRepository.Create(s.ctx, transaction)
	s.NoError(err)
}

func TestTransactionRepositoryDatabaseSuite(t *testing.T) {
	suite.Run(t, new(TransactionRepositoryDatabaseSuite))
}
