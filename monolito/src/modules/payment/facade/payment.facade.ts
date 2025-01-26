import { UseCase } from '../../@shared/usecases/use-case.interface'
import { PaymentFacadeInterface, ProcessPaymentFacadeInput, ProcessPaymentFacadeOutput } from './payment.facade.interface'

export class PaymentFacade implements PaymentFacadeInterface {

    private _processPayment: UseCase

    constructor(
        processPayment: UseCase
    ) {
        this._processPayment = processPayment
    }

    async processPayment(input: ProcessPaymentFacadeInput): Promise<ProcessPaymentFacadeOutput> {
        return this._processPayment.execute(input)
    }
}
