package entity

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldReturnAnErrorWhenNameIsRequired(t *testing.T) {
	_, err := NewClient("", "john.doe@test.com")
	assert.EqualError(t, err, "name is required")
}

func TestShouldReturnAnErrorWhenInvalidEmail(t *testing.T) {
	_, err := NewClient("John Doe", "john.doe")
	assert.EqualError(t, err, "invalid email")
}

func TestShouldCreateClient(t *testing.T) {
	client, err := NewClient("John Doe", "john.doe@test.com")
	assert.NoError(t, err)
	assert.NotEmpty(t, client.ID)
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "john.doe@test.com", client.Email)
	assert.NotZero(t, client.CreatedAt)
	assert.NotZero(t, client.UpdatedAt)
}

func TestShouldReturnAnErrorWhenNameIsRequiredOnUpdate(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	err := client.Update("", "jhon.doe@test.com")
	assert.EqualError(t, err, "name is required")
}

func TestShouldReturnAnErrorWhenInvalidEmailOnUpdate(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	err := client.Update("John Doe", "jhon")
	assert.EqualError(t, err, "invalid email")
}

func TestShouldUpdateClient(t *testing.T) {
	client, _ := NewClient("John Doe", "john.doe@test.com")
	assert.Equal(t, "John Doe", client.Name)
	assert.Equal(t, "john.doe@test.com", client.Email)
	err := client.Update("Jhon Doe 2", "jhon.doe2@test.com")
	assert.NoError(t, err)
	assert.Equal(t, "Jhon Doe 2", client.Name)
	assert.Equal(t, "jhon.doe2@test.com", client.Email)
}

func TestShouldAnErrorWhenAddAccountIfNoOwner(t *testing.T) {
	client, _ := NewClient("John Doe", "jhon.doe@test.com")
	client2, _ := NewClient("John Doe 2", "jhon.doe2@test.com")
	account2, _ := NewAccount(client2)
	err := client.AddAccount(account2)
	assert.EqualError(t, err, "not owner")
	assert.Len(t, client.Accounts, 0)
}

func TestShouldAddAccountToClient(t *testing.T) {
	client, _ := NewClient("John Doe", "john.doe@test.com")
	account, _ := NewAccount(client)
	client.AddAccount(account)
	assert.Len(t, client.Accounts, 1)
	assert.Equal(t, account, client.Accounts[0])
}
