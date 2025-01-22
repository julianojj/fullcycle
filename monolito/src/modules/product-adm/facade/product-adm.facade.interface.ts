export type AddProductFacadeInput = {
    name: string,
    description: string,
    price: number
}

export type AddProductFacadeOutput = {
    id: string
}

export type FindProductFacadeOutput = {
    id: string,
    name: string,
    description: string,
    price: number,
    stock: number
    createdAt: Date,
    updatedAt: Date
}

export type CheckStockFacadeInput = {
    productId: string
}

export type CheckStockFacadeOutput = {
    productId: string,
    stock: number
}

export interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInput): Promise<AddProductFacadeOutput>
    checkStock(id: CheckStockFacadeInput): Promise<CheckStockFacadeOutput>
}
