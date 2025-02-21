package event

type BalanceUpdatedEvent struct {
	Data any
}

func NewBalanceUpdatedEvent() *BalanceUpdatedEvent {
	return &BalanceUpdatedEvent{}
}

func (tc *BalanceUpdatedEvent) SetPayload(data any) {
	tc.Data = data
}

func (tc *BalanceUpdatedEvent) Payload() any {
	return tc.Data
}
