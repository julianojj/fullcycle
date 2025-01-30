export type AddProductInput = {
    name: string,
    description: string,
    price: number,
    stock: number,
}

export type AddProductOutput = {
    id: string
}
