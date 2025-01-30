export type FindClientOutput = {
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
    createdAt: Date
    updatedAt: Date
}
