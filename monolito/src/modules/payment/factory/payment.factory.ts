import { PaymentFacade } from '../facade/payment.facade'
import { PaymentFacadeInterface } from '../facade/payment.facade.interface'
import { TransactionRepository } from '../repository/transaction.repository'
import { ProcessPaymentUsecase } from '../usecases/process-payment/process-payment.usecase'

export class PaymentFactory {
    static create(): PaymentFacadeInterface {
        const transactionRepository = new TransactionRepository()
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        return new PaymentFacade(processPayment)
    }
}
