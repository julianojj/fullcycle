export class ValidationException extends Error {
    
    constructor(message: string) {
        super(message)
    }
}

export class NotFoundExceptions extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class ExceptionMessages {
    static readonly ErrRequiredCustomerId = new ValidationException('Customer id is required')
    static readonly ErrRequiredCustomerName = new ValidationException('Customer name is required')
    static readonly ErrRequiredAddress = new ValidationException('Customer address is required')
    static readonly ErrRequiredStreet = new ValidationException('Street address is required')
    static readonly ErrRequiredCity = new ValidationException('City address is required')
    static readonly ErrRequiredState = new ValidationException('State address is required')
    static readonly ErrRequiredZipCode = new ValidationException('Zip code address is required')
    static readonly ErrNegativeRewardPoints = new ValidationException('Invalid reward points. Negative points are not allowed')
    static readonly ErrCustomerNotFound = new NotFoundExceptions('Customer not found')
    static readonly ErrProductNotFound = new NotFoundExceptions('Product not found')
}
