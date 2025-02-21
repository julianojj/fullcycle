package event

type TransactionCreatedEvent struct {
	Data any
}

func NewTransactionCreatedEvent() *TransactionCreatedEvent {
	return &TransactionCreatedEvent{}
}

func (tc *TransactionCreatedEvent) SetPayload(data any) {
	tc.Data = data
}

func (tc *TransactionCreatedEvent) Payload() any {
	return tc.Data
}
