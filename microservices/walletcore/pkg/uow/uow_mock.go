package uow

import (
	"context"

	"github.com/stretchr/testify/mock"
)

type UowMock struct {
	mock.Mock
}

func NewUowMock() *UowMock {
	return &UowMock{}
}

func (m *UowMock) Register(name string, fc RepositoryFactory) {
	m.Called(name, fc)
}

func (m *UowMock) GetRepository(ctx context.Context, name string) (interface{}, error) {
	args := m.Called(name)
	return args.Get(0), args.Error(1)
}

func (m *UowMock) Do(ctx context.Context, fn func(uow *Uow) error) error {
	args := m.Called(fn)
	return args.Error(0)
}

func (m *UowMock) CommitOrRollback() error {
	args := m.Called()
	return args.Error(0)
}

func (m *UowMock) Rollback() error {
	args := m.Called()
	return args.Error(0)
}

func (m *UowMock) UnRegister(name string) {
	m.Called(name)
}
