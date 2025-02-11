package repository

import (
	"context"
	"database/sql"
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type AccountRepositoryDatabaseSuite struct {
	suite.Suite
	db                *sql.DB
	ctx               context.Context
	clientRepository  *ClientRepositoryDatabase
	accountRepository *AccountRepositoryDatabase
}

func (s *AccountRepositoryDatabaseSuite) SetupTest() {
	db, err := sql.Open("sqlite3", ":memory:")
	s.Require().Nil(err)
	s.db = db
	s.ctx = context.Background()

	clientRepository := NewClientRepositoryDatabase(db)
	accountRepository := NewAccountRepositoryDatabase(db)

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

	s.clientRepository = clientRepository
	s.accountRepository = accountRepository
}

func (s *AccountRepositoryDatabaseSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE Accounts")
	s.db.Exec("DROP TABLE Clients")
}

func (s *AccountRepositoryDatabaseSuite) TestSaveAndFindAccount() {
	client, _ := entity.NewClient("John Doe", "john.doe@test.com")
	s.clientRepository.Save(s.ctx, client)
	account, _ := entity.NewAccount(client)
	account.Credit(1000)
	s.accountRepository.Save(s.ctx, account)
	savedAccount, _ := s.accountRepository.Find(s.ctx, account.ID)
	s.Equal(account.ID, savedAccount.ID)
	s.Equal(account.Client.ID, savedAccount.Client.ID)
	s.Equal(account.Balance, savedAccount.Balance)
	s.Equal(account.Client.ID, client.ID)
	s.Equal(account.Client.Name, client.Name)
	s.Equal(account.Client.Email, client.Email)

}

func TestAccountRepositoryDatabaseSuite(t *testing.T) {
	suite.Run(t, new(AccountRepositoryDatabaseSuite))
}
