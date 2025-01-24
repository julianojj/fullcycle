import { AddClientUsecase } from '../usecases/add-client/add-client.usecase'
import { FindClientUsecase } from '../usecases/find-client/find-client.usecase'
import { AddClientFacadeInput, AddClientFacadeOutput, ClientAdmFacadeInterface, FindClientFacadeInput, FindClientFacadeOutput } from './client-adm.facade.interface'

export class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addClient: AddClientUsecase
    private _findClient: FindClientUsecase

    constructor(
        addClient: AddClientUsecase,
        findClient: FindClientUsecase
    ) {
        this._addClient = addClient
        this._findClient = findClient
    }

    async addClient(input: AddClientFacadeInput): Promise<AddClientFacadeOutput> {
        return this._addClient.execute(input)
    }

    async findClient(input: FindClientFacadeInput): Promise<FindClientFacadeOutput> {
        return this._findClient.execute(input.id)
    }
}
