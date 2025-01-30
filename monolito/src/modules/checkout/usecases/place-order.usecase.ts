import { Id } from '../../@shared/domain/value-object/id.value-object'
import { UseCase } from '../../@shared/usecases/use-case.interface'
import { ClientAdmFacadeInterface } from '../../client-adm/facade/client-adm.facade.interface'
import { InvoiceFacadeInterface } from '../../invoice/facade/invoice.facade.interface'
import { PaymentFacadeInterface } from '../../payment/facade/payment.facade.interface'
import { ProductAdmFacadeInterface } from '../../product-adm/facade/product-adm.facade.interface'
import { FindProductFacadeOutput, StoreCatalogFacadeInterface } from '../../store-catalog/facade/store-catalog.facade.interface'
import { Client } from '../domain/client.entity'
import { Order } from '../domain/order.entity'
import { Product } from '../domain/product.entity'
import { CheckoutGateway } from '../gateway/checkout.gateway'
import { PlaceOrderInput, PlaceOrderOutput } from './place-order.usecase.dto'

export class PlaceOrder implements UseCase {

    private _orderRepository: CheckoutGateway
    private _clientAdmFacade: ClientAdmFacadeInterface
    private _storeCatalogFacade: StoreCatalogFacadeInterface
    private _productAdmFacade: ProductAdmFacadeInterface
    private _paymentFacade: PaymentFacadeInterface
    private _invoiceFacade: InvoiceFacadeInterface

    constructor(
        orderGateway: CheckoutGateway,
        clientAdmFacade: ClientAdmFacadeInterface,
        storeCatalogFacade: StoreCatalogFacadeInterface,
        productAdmFacade: ProductAdmFacadeInterface,
        paymentFacade: PaymentFacadeInterface,
        invoiceFacade: InvoiceFacadeInterface
    ) {
        this._orderRepository = orderGateway
        this._clientAdmFacade = clientAdmFacade
        this._storeCatalogFacade = storeCatalogFacade
        this._productAdmFacade = productAdmFacade
        this._paymentFacade = paymentFacade
        this._invoiceFacade = invoiceFacade
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        if (input.items.length < 1) throw new Error('no products selected')
        const existingClient = await this._clientAdmFacade.findClient({
            id: input.clientId
        })
        const client = new Client({
            id: new Id(existingClient.id),
            name: existingClient.name,
            email: existingClient.email,
            address: existingClient.address.toString(),
            createdAt: existingClient.createdAt,
            updatedAt: existingClient.updatedAt
        })
        const order = new Order({
            clientId: client.id
        })
        const catalogProducts: FindProductFacadeOutput[] = []
        for (const inputItem of input.items) {
            const existingItem = await this._productAdmFacade.checkStock({
                productId: inputItem.productId
            })
            if (existingItem.stock < inputItem.quantity) throw new Error('no stock available')
            const existingProductCatalog = await this._storeCatalogFacade.findProduct(inputItem.productId)
            catalogProducts.push(existingProductCatalog)
            const product = new Product({
                id: new Id(existingProductCatalog.id),
                name: existingProductCatalog.name,
                description: existingProductCatalog.description,
                salesPrice: existingProductCatalog.salesPrice,
            })
            order.addProduct(product)
        }
        const total = order.calculateTotal()
        const outputPayment = await this._paymentFacade.processPayment({
            orderId: order.id,
            amount: total
        })
        if (outputPayment.status === 'approved') {
            order.approve()
            const output = await this._invoiceFacade.generateInvoice({
                name: existingClient.name,
                document: input.document,
                street: existingClient.address.street,
                number: '-',
                complement: existingClient.address.complement,
                city: existingClient.address.city,
                state: existingClient.address.state,
                zipCode: existingClient.address.zipCode,
                items: catalogProducts.map(catalogProduct => ({
                    id: catalogProduct.id,
                    name: catalogProduct.name,
                    price: catalogProduct.salesPrice
                }))
            })
            order.invoiceId = output.id
        } else {
            order.decline()
        }
        await this._orderRepository.save(order)
        return {
            orderId: order.id,
            invoiceId: order.invoiceId,
            status: order.status,
            total
        }
    }
}
