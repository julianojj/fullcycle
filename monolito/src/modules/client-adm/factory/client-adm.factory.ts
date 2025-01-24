import { ClientAdmFacade } from '../facade/client-adm.facade'
import { ClientRepository } from '../repository/client.repository'
import { AddClientUsecase } from '../usecases/add-client/add-client.usecase'
import { FindClientUsecase } from '../usecases/find-client/find-client.usecase'

export class ClientAdmFacadeFactory {
    static create(): ClientAdmFacade {
        const clientRepository = new ClientRepository()
        const addClient = new AddClientUsecase(clientRepository)            
        const findClient = new FindClientUsecase(clientRepository)      
        return new ClientAdmFacade(addClient, findClient)
    }   
}
