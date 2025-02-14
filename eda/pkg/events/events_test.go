package events

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

type EventsSuite struct {
	suite.Suite
	publisher *PublisherDispatch
}

type PublisherMock struct {
	mock.Mock
}

func (m *PublisherMock) Notify(eventName string, event Event) {
	m.Called(eventName, event)
}

func (s *EventsSuite) SetupTest() {
	s.publisher = &PublisherDispatch{}
}

func (s *EventsSuite) TestRegisterHandler() {
	handler := &CreatedAccountHandler{}
	s.publisher.Register(handler)

	s.Len(s.publisher.handlers, 1)
	s.Equal(handler, s.publisher.handlers[0])
	s.Equal(handler.Name(), s.publisher.handlers[0].Name())
}

func (s *EventsSuite) TestRemoveHandler() {
	handler := &CreatedAccountHandler{}
	s.publisher.Register(handler)
	s.publisher.Remove(handler)

	s.Len(s.publisher.handlers, 0)
}

func (s *EventsSuite) TestClearHandlers() {
	handler := &CreatedAccountHandler{}
	s.publisher.Register(handler)
	s.Len(s.publisher.handlers, 1)
	s.publisher.Clear()

	s.Len(s.publisher.handlers, 0)
}

func (s *EventsSuite) TestRegisterHandlerWithAnError() {
	handler := &CreatedAccountHandler{}
	s.publisher.Register(handler)
	err := s.publisher.Register(handler)
	s.Error(err, "handler already registered")
	s.Len(s.publisher.handlers, 1)

}

func (s *EventsSuite) TestNotify() {
	mockPublisher := new(PublisherMock)
	event := NewAccountEvent()
	event.SetPayload(map[string]any{"name": "Juliano"})
	mockPublisher.On("Notify", "created_account", event)
	mockPublisher.Notify("created_account", event)
	mockPublisher.AssertNumberOfCalls(s.T(), "Notify", 1)
	mockPublisher.AssertCalled(s.T(), "Notify", "created_account", event)
}

func TestEventsSuite(t *testing.T) {
	suite.Run(t, new(EventsSuite))
}
