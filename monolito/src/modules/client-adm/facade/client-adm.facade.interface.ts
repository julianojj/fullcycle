export type AddClientFacadeInput = {
    name: string,
    email: string,
    address: string
}

export type AddClientFacadeOutput = {
    id: string
}

export type FindClientFacadeInput = {
    id: string
}

export type FindClientFacadeOutput = {
    id: string,
    name: string,
    email: string,
    address: string
    createdAt: Date,
    updatedAt: Date
}

export interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInput): Promise<AddClientFacadeOutput>
    findClient(input: FindClientFacadeInput): Promise<FindClientFacadeOutput>
}
