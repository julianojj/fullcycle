import { ClientAdmFacadeFactory } from '../../client-adm/factory/client-adm.factory'
import { InvoiceFacadeFactory } from '../../invoice/factory/invoice.factory'
import { PaymentFactory } from '../../payment/factory/payment.factory'
import { ProductAdmFacadeFactory } from '../../product-adm/factory/product-adm.factory'
import { StoreCatalogFacadeFactory } from '../../store-catalog/factory/store-catalog.factory'
import { CheckoutFacade } from '../facade/checkout.facade'
import { CheckoutFacadeInterface } from '../facade/checkout.facade.interface'
import { PlaceOrder } from '../usecases/place-order.usecase'

export class CheckoutFactory {
    static create(): CheckoutFacadeInterface {
        const clientAdmFacade = ClientAdmFacadeFactory.create()
        const storeCatalogFacade = StoreCatalogFacadeFactory.create()
        const productAdmFacade = ProductAdmFacadeFactory.create()
        const paymentFacade = PaymentFactory.create()
        const invoiceFacade = InvoiceFacadeFactory.create()
        const placeOrder = new PlaceOrder(
            clientAdmFacade,
            storeCatalogFacade,
            productAdmFacade,
            paymentFacade,
            invoiceFacade
        )
        return new CheckoutFacade(placeOrder)
    }
}