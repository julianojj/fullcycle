import { CustomerRepositoryInterface } from '../../../domain/customer/repository/CustomerRepositoryInterface'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { FindCustomerOutput } from './FindCustomer.dto'

export class FindCustomer {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) { }

    async execute(customerId: string): Promise<FindCustomerOutput> {
        const customer = await this.customerRepository.findById(customerId)
        if (!customer) throw ExceptionMessages.ErrCustomerNotFound
        return {
            id: customer.id,
            name: customer.name,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
            rewardPoints: customer.rewardPoints,
        }
    }
}
