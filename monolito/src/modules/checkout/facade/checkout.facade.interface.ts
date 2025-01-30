export type PlaceOrderFacadeInput = {
    clientId: string,
    document: string,
    items: { productId: string, quantity: number }[]
}

export type PlaceOrderFacadeOutput = {
    orderId: string,
    status: string,
    total: number
}


export interface CheckoutFacadeInterface {
    placeOrder(input: PlaceOrderFacadeInput): Promise<PlaceOrderFacadeOutput>
}
