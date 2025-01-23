export type FindProductFacadeOutput = {
    id: string,
    name: string,
    description: string,
    salesPrice: number
}

export type FindAllProductsFacadeOutput = {
    id: string,
    name: string,
    description: string,
    salesPrice: number
}


export interface StoreCatalogFacadeInterface {
    findAllProducts(): Promise<FindAllProductsFacadeOutput>
    findProduct(productId: string): Promise<FindProductFacadeOutput>
}
