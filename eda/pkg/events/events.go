package events

import (
	"errors"
	"log/slog"
)

type (
	AccountEvent struct {
		Data any
	}
	CreatedAccountHandler struct{}
	PublisherDispatch             struct {
		handlers []EventHandler
	}
)

var (
	_ Event        = (*AccountEvent)(nil)
	_ EventHandler = (*CreatedAccountHandler)(nil)
	_ Publisher    = (*PublisherDispatch)(nil)
)

func NewAccountEvent() Event {
	return &AccountEvent{}
}

func (a *AccountEvent) SetPayload(payload any) {
	a.Data = payload
}
func (a *AccountEvent) Payload() any {
	return a.Data
}

func (a *CreatedAccountHandler) Name() string {
	return "created_account"
}

func (a *CreatedAccountHandler) Handle(event Event) {
	accountEvent := event.Payload()
	slog.Info(
		"Account created",
		slog.Any("data", accountEvent),
	)
}

func (o *PublisherDispatch) Register(handler EventHandler) error {
	for _, h := range o.handlers {
		if h == handler {
			return errors.New("handler already registered")
		}
	}
	o.handlers = append(o.handlers, handler)
	return nil
}

func (o *PublisherDispatch) Remove(handler EventHandler) {
	handlers := []EventHandler{}
	for _, h := range o.handlers {
		if h != handler {
			handlers = append(handlers, h)
			continue
		}
	}
	o.handlers = handlers
}

func (o *PublisherDispatch) Clear() {
	o.handlers = []EventHandler{}
}

func (o *PublisherDispatch) Notify(eventName string, event Event) {
	for _, handler := range o.handlers {
		if handler.Name() == eventName {
			go handler.Handle(event)
		}
	}
}
