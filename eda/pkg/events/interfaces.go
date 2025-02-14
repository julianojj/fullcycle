package events

type Event interface {
	SetPayload(payload any)
	Payload() any
}

type EventHandler interface {
	Name() string
	Handle(event Event)
}

type Publisher interface {
	Register(handler EventHandler) error
	Remove(handler EventHandler)
	Clear()
	Notify(eventName string, event Event)
}
