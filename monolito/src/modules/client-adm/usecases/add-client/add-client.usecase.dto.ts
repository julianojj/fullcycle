export type AddClientInput = {
    name: string,
    email: string,
    address: {
        street: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    },
}

export type AddClientOutput = {
    id: string
    name: string,
    email: string,
    address: {
        street: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string
    },
    createdAt: Date
    updatedAt: Date
}
