import { UseCase } from '../../@shared/usecases/use-case.interface'
import { CheckoutFacadeInterface, PlaceOrderFacadeInput, PlaceOrderFacadeOutput } from './checkout.facade.interface'

export class CheckoutFacade implements CheckoutFacadeInterface {

    private _placeOrder: UseCase

    constructor(
        placeOrder: UseCase
    ) {
        this._placeOrder = placeOrder
    }

    async placeOrder(input: PlaceOrderFacadeInput): Promise<PlaceOrderFacadeOutput> {
        return this._placeOrder.execute(input)
    }
}
