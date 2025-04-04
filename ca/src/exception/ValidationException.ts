export class ValidationException extends Error {
    
    constructor(message: string) {
        super(message)
    }
}

export class NotFoundException extends Error {
    constructor(message: string) {
        super(message)
    }
}

export class ExceptionMessages {
    static readonly ErrRequiredCustomerId = new ValidationException('Id is required')
    static readonly ErrRequiredCustomerName = new ValidationException('Name is required')
    static readonly ErrRequiredAddress = new ValidationException('Address is required')
    static readonly ErrRequiredStreet = new ValidationException('Street address is required')
    static readonly ErrRequiredCity = new ValidationException('City address is required')
    static readonly ErrRequiredState = new ValidationException('State address is required')
    static readonly ErrRequiredZipCode = new ValidationException('Zip code address is required')
    static readonly ErrNegativeRewardPoints = new ValidationException('Invalid reward points. Negative points are not allowed')
    static readonly ErrCustomerNotFound = new NotFoundException('Customer not found')
    static readonly ErrProductNotFound = new NotFoundException('Product not found')
    static readonly ErrRequiredProductId = new ValidationException('Id is required')
    static readonly ErrRequiredProductName = new ValidationException('Name is required')
    static readonly ErrInvalidPrice = new ValidationException('Invalid price')
}
