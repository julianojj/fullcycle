package exception

type DomainException struct {
	Message string
}

var (
	ErrNameIsRequired      = NewDomainException("name is required")
	ErrInvalidEmail        = NewDomainException("invalid email")
	ErrClientIsRequired    = NewDomainException("client is required")
	ErrInvalidAmount       = NewDomainException("invalid amount")
	ErrInsufficientBalance = NewDomainException("insufficient balance")
	ErrNotOwner            = NewDomainException("not owner")
)

func NewDomainException(message string) error {
	return &DomainException{Message: message}
}

func (e *DomainException) Error() string {
	return e.Message
}
