import { Transaction } from '../domain/transaction.entity'

export interface PaymentGateway {
    save(transaction: Transaction): Promise<void>
    find(transactionId: string): Promise<Transaction>
}
