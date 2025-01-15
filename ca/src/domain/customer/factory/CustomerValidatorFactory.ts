import { Validator } from '../../validator/Validator'
import { Customer } from '../entity/Customer'
import { CustomerYupValidator } from '../validator/CustomerYupValidator'

export class CustomerValidatorFactory {
    static create(): Validator<Customer> {
        return new CustomerYupValidator()
    }
}
