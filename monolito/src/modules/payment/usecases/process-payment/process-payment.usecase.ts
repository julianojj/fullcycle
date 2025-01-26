import { UseCase } from '../../../@shared/usecases/use-case.interface'
import { Transaction } from '../../domain/transaction.entity'
import { PaymentGateway } from '../../gateway/payment.gateway'
import { ProcessPaymentInput, ProcessPaymentOutput } from './process-payment.usecase.dto'

export class ProcessPaymentUsecase implements UseCase {

    private _paymentGateway: PaymentGateway

    constructor(
        paymentGateway: PaymentGateway
    ) {
        this._paymentGateway = paymentGateway
    }

    async execute(input: ProcessPaymentInput): Promise<ProcessPaymentOutput> {
        const transaction = new Transaction({
            orderId: input.orderId,
            amount: input.amount,
            status: 'pending'
        })
        transaction.process()
        await this._paymentGateway.save(transaction)
        return {
            transactionId: transaction.id,
            orderId: transaction.orderId,
            amount: transaction.amount,
            status: transaction.status,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
        }
    }
}
