import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Address } from '../domain/address'
import { Client } from '../domain/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import ClientModel from './client.model'

export class ClientRepository implements ClientGateway {
    async add(customer: Client): Promise<void> {
        await ClientModel.create({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            street: customer.address.street,
            complement: customer.address.complement,
            city: customer.address.city,
            state: customer.address.state,
            zipCode: customer.address.zipCode,
            createdAt: customer.createdAt,
            updatedAt: customer.updatedAt,
        })
    }

    async find(id: string): Promise<Client> {
        const clientResult = await ClientModel.findByPk(id)
        if (!clientResult) return null
        return new Client({
            id: new Id(clientResult.id),
            name: clientResult.name,
            email: clientResult.email,
            address: new Address(
                clientResult.street,
                clientResult.complement,
                clientResult.city,
                clientResult.state,
                clientResult.zipCode,
            ),
            createdAt: clientResult.createdAt,
            updatedAt: clientResult.updatedAt,
        })
    }
}
