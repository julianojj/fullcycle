export type ProcessPaymentFacadeInput = {
    orderId: string,
    amount: number
}

export type ProcessPaymentFacadeOutput = {
    transactionId: string,
    orderId: string,
    amount: number,
    status: string,
    createdAt: Date,
}

export interface PaymentFacadeInterface {
    processPayment(input: ProcessPaymentFacadeInput): Promise<ProcessPaymentFacadeOutput>
}
