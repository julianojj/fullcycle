import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Transaction } from '../domain/transaction.entity'
import { PaymentGateway } from '../gateway/payment.gateway'
import TransactionModel from './transaction.model'

export class TransactionRepository implements PaymentGateway {
    async save(transaction: Transaction): Promise<void> {
        await TransactionModel.create({
            id: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

    async find(transactionId: string): Promise<Transaction> {
        const result = await TransactionModel.findOne({
            where: { id: transactionId },
        })
        return new Transaction({
            id: new Id(result.id),
            orderId: result.orderId,
            amount: result.amount,
            status: result.status,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        })
    }
}
