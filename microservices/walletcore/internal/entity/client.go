package entity

import (
	"net/mail"
	"time"

	"github.com/google/uuid"
	"github.com/julianojj/fullcycle/microservices/walletcore/internal/exception"
)

type Client struct {
	ID        string
	Name      string
	Email     string
	CreatedAt time.Time
	UpdatedAt time.Time
	Accounts  []*Account
}

func NewClient(
	name string,
	email string,
) (*Client, error) {
	now := time.Now().UTC()
	client := &Client{
		ID:        uuid.NewString(),
		Name:      name,
		Email:     email,
		CreatedAt: now,
		UpdatedAt: now,
	}
	if err := client.Validate(); err != nil {
		return nil, err
	}
	return client, nil
}

func (c *Client) Validate() error {
	if c.Name == "" {
		return exception.ErrNameIsRequired
	}
	if isInvalidEmail(c.Email) {
		return exception.ErrInvalidEmail
	}
	return nil
}

func isInvalidEmail(email string) bool {
	_, err := mail.ParseAddress(email)
	return err != nil
}

func (c *Client) Update(name string, email string) error {
	c.Name = name
	c.Email = email
	c.UpdatedAt = time.Now().UTC()
	return c.Validate()
}

func (c *Client) AddAccount(account *Account) error {
	if account.Client.ID != c.ID {
		return exception.ErrNotOwner
	}
	c.Accounts = append(c.Accounts, account)
	return nil
}
