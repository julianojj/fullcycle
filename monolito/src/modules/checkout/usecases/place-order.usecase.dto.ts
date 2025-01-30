export type PlaceOrderInput = {
    clientId: string,
    document: string,
    items: { productId: string, quantity: number }[]
}

export type PlaceOrderOutput = {
    orderId: string,
    invoiceId: string,
    status: string,
    total: number
}
