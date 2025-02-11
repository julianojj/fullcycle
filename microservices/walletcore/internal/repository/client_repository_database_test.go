package repository

import (
	"context"
	"database/sql"
	"log"
	"testing"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/suite"
)

type ClientRepositoryDatabaseSuite struct {
	suite.Suite
	db               *sql.DB
	clientRepository *ClientRepositoryDatabase
}

func (s *ClientRepositoryDatabaseSuite) SetupSuite() {
	db, err := sql.Open("sqlite3", ":memory:")
	if err != nil {
		log.Fatal(err)
	}
	s.db = db
	s.db.Exec(`
		CREATE TABLE Clients(
			Id VARCHAR(36) PRIMARY KEY,
			Name VARCHAR(255) NOT NULL,
			Email VARCHAR(255) UNIQUE NOT NULL,
			CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		)
	`)
	s.clientRepository = NewClientRepositoryDatabase(s.db)
}

func (s *ClientRepositoryDatabaseSuite) TearDownSuite() {
	defer s.db.Close()
	s.db.Exec("DROP TABLE Clients")
}

func (s *ClientRepositoryDatabaseSuite) TestSaveAndFindClient() {
	client, _ := entity.NewClient("John Doe", "jhon.doe@test.com")
	s.clientRepository.Save(context.Background(), client)
	savedClient, _ := s.clientRepository.Find(context.Background(), client.ID)
	s.Equal(client.ID, savedClient.ID)
	s.Equal(client.Name, savedClient.Name)
	s.Equal(client.Email, savedClient.Email)
	s.Equal(client.CreatedAt, savedClient.CreatedAt)
}

func TestClientRepositoryDatabaseSuite(t *testing.T) {
	suite.Run(t, new(ClientRepositoryDatabaseSuite))
}
