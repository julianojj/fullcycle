package usecase

import (
	"context"
	"testing"
	"time"

	"github.com/julianojj/fullcycle/microservices/walletcore/internal/entity"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/repository"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateClient(t *testing.T) {
	ctx := context.Background()
	clientRepository := repository.NewClientRepositoryMock()
	createClient := NewCreateClient(clientRepository)
	input := &CreateClientInput{
		Name:  "John Doe",
		Email: "john.doe@test.com",
	}
	clientRepository.On("Save", ctx, mock.Anything).Return(nil)
	output, err := createClient.Execute(ctx, input)
	assert.NoError(t, err)
	assert.NotEmpty(t, output.ID)
	now := time.Now().UTC()
	mockedClient := &entity.Client{
		ID:        output.ID,
		Name:      input.Name,
		Email:     input.Email,
		CreatedAt: now,
		UpdatedAt: now,
	}
	clientRepository.On("Find", ctx, output.ID).Return(mockedClient, nil)
	client, _ := clientRepository.Find(ctx, output.ID)
	assert.Equal(t, output.ID, client.ID)
	assert.Equal(t, input.Name, client.Name)
	assert.Equal(t, input.Email, client.Email)
	assert.Equal(t, now, client.CreatedAt)
	assert.Equal(t, now, client.UpdatedAt)
}
