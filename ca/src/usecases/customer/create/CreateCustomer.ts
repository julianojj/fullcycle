import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/CustomerRepositoryInterface'

export default class CreateCustomer {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
    ) { }

    async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> {
        const customer = CustomerFactory.create(
            input.name,
            input.street,
            input.city,
            input.state,
            input.zipCode
        )
        await this.customerRepository.create(customer)
        return { customerId: customer.id }
    }
}

export type CreateCustomerInput = {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
}

export type CreateCustomerOutput = {
    customerId: string
}
