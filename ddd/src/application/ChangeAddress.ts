import { Address } from "../domain/entity/Customer";
import { CustomerAddressChangedEvent } from "../domain/event/Event";
import { CustomerRepositoryInterface } from "../domain/repository/CustomerRepositoryInterface";
import { EventObserver } from "../infra/event/EventObserver";

export default class ChangeAddress {
    private _customerRepository: CustomerRepositoryInterface
    private _observer: EventObserver
    private _eventName = 'CustomerAddressChanged'

    constructor(
        customerRepository: CustomerRepositoryInterface,
        observer: EventObserver
    ) {
        this._customerRepository = customerRepository
        this._observer = observer
    }

    async execute(input: UpdateAddressInput): Promise<void> {
        const customer = await this._customerRepository.findById(input.customerId)
        customer.updateAddress(new Address(input.street, input.city, input.state, input.zipCode))
        await this._customerRepository.update(customer)
        const event = new CustomerAddressChangedEvent({
            customerId: input.customerId,
            name: customer.name,
            address: customer.address.toUS,
        })
        this._observer.notify(this._eventName, event)
    }
}

export type UpdateAddressInput = {
    customerId: string
    street: string
    city: string
    state: string
    zipCode: string
}
