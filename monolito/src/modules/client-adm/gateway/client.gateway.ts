import { Client } from '../domain/client.entity'

export interface ClientGateway {
    find(id: string): Promise<Client>
    add(client: Client): Promise<void>
}
