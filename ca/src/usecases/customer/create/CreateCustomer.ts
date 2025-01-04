import CustomerFactory from '../../../domain/customer/factory/CustomerFactory'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/CustomerRepositoryInterface'
import { CreateCustomerInput, CreateCustomerOutput } from './CreateCustomer.dto'

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

