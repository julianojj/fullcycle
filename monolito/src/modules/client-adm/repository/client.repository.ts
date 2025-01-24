import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Client } from '../domain/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import ClientModel from './client.model'

export class ClientRepository implements ClientGateway {
    async add(customer: Client): Promise<void> {
        await ClientModel.create({
            id: customer.id,
            name: customer.name,
            email: customer.email,
            address: customer.address,
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
            address: clientResult.address,
            createdAt: clientResult.createdAt,
            updatedAt: clientResult.updatedAt,
        })
    }
}
