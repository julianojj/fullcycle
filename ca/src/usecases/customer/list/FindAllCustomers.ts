import { CustomerRepositoryInterface } from '../../../domain/customer/repository/CustomerRepositoryInterface'

export class FindAllCustomers {
    constructor(
        private readonly customerRepository: CustomerRepositoryInterface
    ) { }

    async execute(): Promise<FindAllCustomersOutput[]> {
        const customers = await this.customerRepository.findAll()
        const output: FindAllCustomersOutput[] = []
        for (const customer of customers) {
            output.push({
                id: customer.id,
                name: customer.name,
                street: customer.address.street,
                city: customer.address.city,
                state: customer.address.state,
                zipCode: customer.address.zipCode,
                rewardPoints: customer.rewardPoints,
            })
        }
        return output
    }
}

export type FindAllCustomersOutput = {
    id: string,
    name: string,
    street: string,
    city: string,
    state: string,
    zipCode: string,
    rewardPoints: number,
}
