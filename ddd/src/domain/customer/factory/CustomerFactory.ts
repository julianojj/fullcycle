import { randomUUID } from 'crypto'
import { Address, Customer } from '../entity/Customer'

export default class CustomerFactory {
    static create(name: string, street: string, city: string, state: string, zipCode: string): Customer {
        return new Customer(
            randomUUID(),
            name,
            new Address(
                street,
                city,
                state,
                zipCode
            )
        )
    }
}
