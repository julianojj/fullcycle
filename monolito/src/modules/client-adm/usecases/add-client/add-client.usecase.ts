import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { Address } from '../../domain/address'
import { Client } from '../../domain/client.entity'
import { ClientGateway } from '../../gateway/client.gateway'
import { AddClientInput, AddClientOutput } from './add-client.usecase.dto'

export class AddClientUsecase implements UseCase {
    private _clientRepository: ClientGateway

    constructor(
        clientRepository: ClientGateway
    ) {
        this._clientRepository = clientRepository
    }

    async execute(input: AddClientInput): Promise<AddClientOutput> {
        const client = new Client({
            name: input.name,
            email: input.email,
            address: new Address(
                input.address.street,
                input.address.complement,
                input.address.city,
                input.address.state,
                input.address.zipCode,
            )
        })
        await this._clientRepository.add(client)
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        }
    }
}
