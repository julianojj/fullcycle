export type GenerateInvoiceFacadeInputDto = {
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

export type GenerateInvoiceFacadeOutputDto = {
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

export type FindInvoiceFacadeInputDTO = {
    id: string
}

export type FindInvoiceFacadeOutputDTO = {
    id: string,
    name: string,
    document: string,
    address: {
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        zipCode: string,
    },
    items: {
        id: string,
        name: string,
        price: number,
    }[],
    total: number,
    createdAt: Date
}

export interface InvoiceFacadeInterface {
    generateInvoice(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>
    findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>
}
