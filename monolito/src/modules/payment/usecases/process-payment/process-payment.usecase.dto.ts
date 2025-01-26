export type ProcessPaymentInput = {
    orderId: string,
    amount: number
}

export type ProcessPaymentOutput = {
    transactionId: string,
    orderId: string,
    amount: number,
    status: string,
    createdAt: Date,
    updatedAt: Date
}
