export type AddClientFacadeInput = {
    name: string,
    email: string,
    address: {
        street: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    }
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
    address: {
        street: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    },
    createdAt: Date,
    updatedAt: Date
}

export interface ClientAdmFacadeInterface {
    addClient(input: AddClientFacadeInput): Promise<AddClientFacadeOutput>
    findClient(input: FindClientFacadeInput): Promise<FindClientFacadeOutput>
}
