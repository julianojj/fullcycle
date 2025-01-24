export type AddClientInput = {
    name: string,
    email: string,
    address: string
}

export type AddClientOutput = {
    id: string
    name: string,
    email: string,
    address: string
    createdAt: Date
    updatedAt: Date
}
