export type GenerateInvoiceUseCaseInputDto = {
    name: string,
    document: string,
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
    items: {
        id: string,
        name: string,
        price: number,
    }[],
}

export type GenerateInvoiceUseCaseOutputDto = {
    id: string,
    name: string,
    document: string,
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
    items: {
        id: string,
        name: string,
        price: number,
    }[],
    total: number
}
