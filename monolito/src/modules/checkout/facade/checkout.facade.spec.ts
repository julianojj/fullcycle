import { describe, expect, it, vitest } from 'vitest'
import { CheckoutFacade } from './checkout.facade'
import { PlaceOrder } from '../usecases/place-order.usecase'


describe('Place order test', () => {

    it('should place order', async () => {
        const clientAdmFacade = {
            addClient: vitest.fn(),
            findClient: vitest.fn().mockResolvedValue({
                id: '1',
                name: 'Test Client',
                email: 'test@example.com',
                address: 'Test Address'
            })
        }
        const storeCatalogFacade = {
            findAllProducts: vitest.fn(),
            findProduct: vitest.fn()
        }
        const productFacade = {
            addProduct: vitest.fn(),
            checkStock: vitest.fn(),
        }
        const paymentFacade = {
            processPayment: vitest.fn().mockResolvedValue({
                status: 'approved',
            })
        }
        const invoiceFacade = {
            generateInvoice: vitest.fn().mockResolvedValueOnce({
                invoiceId: '1',
                status: 'pending',
                total: 300
            }),
            findInvoice: vitest.fn()
        }
        storeCatalogFacade.findProduct.mockResolvedValueOnce({
            id: '1',
            name: 'Test Product 1',
            description: 'Test Product 1 Description',
            salesPrice: 100
        })
        storeCatalogFacade.findProduct.mockResolvedValueOnce({
            id: '2',
            name: 'Test Product 2',
            description: 'Test Product 2 Description',
            salesPrice: 200
        })
        productFacade.checkStock.mockResolvedValueOnce({
            id: '1',
            stock: 10
        })
        productFacade.checkStock.mockResolvedValueOnce({
            id: '2',
            stock: 20
        })
        const placeOrder = new PlaceOrder(clientAdmFacade, storeCatalogFacade, productFacade, paymentFacade, invoiceFacade)
        const checkoutFacade = new CheckoutFacade(placeOrder)
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
        expect(clientAdmFacade.findClient).toBeCalledWith({
            id: '1'
        })
        expect(output.total).toBe(300)
        expect(output.status).toBe('approved_payment')
    })
})
