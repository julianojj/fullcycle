import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { ClientGateway } from '../../gateway/client.gateway'
import { FindClientOutput } from './find-client.usecase.dto'

export class FindClientUsecase implements UseCase {
    private _clientRepository: ClientGateway

    constructor(
        clientRepository: ClientGateway
    ) {
        this._clientRepository = clientRepository
    }

    async execute(clientId: string): Promise<FindClientOutput> {
        const client = await this._clientRepository.find(clientId)
        if (!client) throw new Error('client not found')
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            address: {
                street: client.address.street,
                complement: client.address.complement,
                city: client.address.city,
                state: client.address.state,
                zipCode: client.address.zipCode,
            },
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
}
