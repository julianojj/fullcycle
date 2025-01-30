import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import ClientModel from '../../client-adm/repository/client.model'
import clientAdmSequelize from '../../client-adm/repository/sequelize'
import InvoiceItemModel from '../../invoice/repository/invoice-items.model'
import InvoiceModel from '../../invoice/repository/invoice.model'
import invoiceSequelize from '../../invoice/repository/sequelize'
import paymentSequelize from '../../payment/repository/sequelize'
import TransactionModel from '../../payment/repository/transaction.model'
import ProductModel from '../../product-adm/repository/product.model'
import productSequelize from '../../product-adm/repository/sequelize'
import CatalogProductModel from '../../store-catalog/repository/product.model'
import catalogSequelize from '../../store-catalog/repository/sequelize'
import { OrderItemModel } from '../repository/order-item.model'
import { OrderModel } from '../repository/order.model'
import checkoutSequelize from '../repository/sequelize'
import { CheckoutFactory } from './checkout.factory'


describe('Place order test', () => {
    beforeEach(async () => {
        await checkoutSequelize.sync()
        await clientAdmSequelize.sync()
        await invoiceSequelize.sync()
        await paymentSequelize.sync()
        await catalogSequelize.sync()
        await productSequelize.sync()
    })

    afterEach(async () => {
        await ClientModel.destroy({ where: {} })
        await OrderItemModel.destroy({ where: {} })
        await OrderModel.destroy({ where: {} })
        await InvoiceModel.destroy({ where: {} })
        await InvoiceItemModel.destroy({ where: {} })
        await TransactionModel.destroy({ where: {} })
        await CatalogProductModel.destroy({ where: {} })
        await ProductModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await checkoutSequelize.close()
        await clientAdmSequelize.close()
        await invoiceSequelize.close()
        await paymentSequelize.close()
        await catalogSequelize.close()
        await productSequelize.close()
    })

    it('should place order', async () => {
        await ClientModel.create({
            id: '1',
            name: 'Test Client',
            email: 'test@example.com',
            address: {
                street: 'Test Street',
                number: '123',
                city: 'Test City',
                state: 'Test State',
                country: 'Test Country'
            }
        })

        await CatalogProductModel.bulkCreate([
            { id: '1', name: 'Test Product 1', description: 'This is a test product 1', salesPrice: 100 },
            { id: '2', name: 'Test Product 2', description: 'This is a test product 2', salesPrice: 150 },
        ])

        await ProductModel.bulkCreate([
            { id: '1', stock: 10 },
            { id: '2', stock: 20 }
        ])

        const checkoutFacade = CheckoutFactory.create()
        const output = await checkoutFacade.placeOrder({
            clientId: '1',
            document: '111.111.111-11',
            items: [
                {
                    productId: '1',
                    quantity: 2
                },
                {
                    productId: '2',
                    quantity: 1
                }
            ]
        })
        expect(output.orderId).toBeDefined()
        expect(output.status).toBe('approved_payment')
    })
})
