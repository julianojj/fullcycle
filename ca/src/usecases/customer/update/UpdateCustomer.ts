import { Address } from '../../../domain/customer/entity/Customer'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/CustomerRepositoryInterface'
import { UpdateCustomerInput } from './UpdateCustomer.dto'

export class UpdateCustomer {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface,
    ) { }

    async execute(input: UpdateCustomerInput): Promise<void> {
        const existingCustomer = await this.customerRepository.findById(input.id)
        if (!existingCustomer) throw new Error('Customer not found')
        existingCustomer.updateName(input.name)
        existingCustomer.updateAddress(new Address(input.street, input.city, input.state, input.zipCode))
        existingCustomer.addRewardPoints(input.rewardPoints)
        await this.customerRepository.update(existingCustomer)
    }
}
