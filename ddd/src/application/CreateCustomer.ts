import { CustomerCreatedEvent } from "../domain/@shared/event/Event"
import CustomerFactory from "../domain/customer/factory/CustomerFactory"
import { CustomerRepositoryInterface } from "../domain/customer/repository/CustomerRepositoryInterface"
import { EventObserver } from "../infra/event/EventObserver"

export default class CreateCustomer {
    private _customerRepository: CustomerRepositoryInterface
    private _observer: EventObserver
    private _eventName = 'CustomerCreated'

    constructor(
        customerRepository: CustomerRepositoryInterface,
        observer: EventObserver
    ) {
        this._customerRepository = customerRepository
        this._observer = observer
    }

    async execute(input: CreateCustomerInput): Promise<CreateCustomerOutput> { 
        const customer = CustomerFactory.create(
            input.name,
            input.street,
            input.city,
            input.state,
            input.zipCode
        )
        await this._customerRepository.create(customer)
        const event = new CustomerCreatedEvent({
            customerId: customer.id,
            street: customer.address.street,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
        })
        this._observer.notify(this._eventName, event)
        return { customerId: customer.id }
    }
}

export type CreateCustomerInput = {
    name: string
    email: string
    street: string
    city: string
    state: string
    zipCode: string
}

export type CreateCustomerOutput = {
    customerId: string
}
