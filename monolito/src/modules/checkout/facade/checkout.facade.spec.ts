import { describe, expect, it, vitest } from 'vitest'
import { PlaceOrder } from '../usecases/place-order.usecase'
import { CheckoutFacade } from './checkout.facade'


describe('Place order test', () => {

    it('should place order', async () => {
        const orderRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
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
        const placeOrder = new PlaceOrder(orderRepository, clientAdmFacade, storeCatalogFacade, productFacade, paymentFacade, invoiceFacade)
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
        orderRepository.find.mockResolvedValue({
            id: output.orderId,
            clientId: '1',
            status: 'pending_payment',
            total: 300
        })
        expect(output.orderId).toBeDefined()
        expect(clientAdmFacade.findClient).toBeCalledWith({
            id: '1'
        })
        const savedOrder = await orderRepository.find(output.orderId)
        expect(savedOrder.status).toBe('pending_payment')
        expect(savedOrder.total).toBe(300)
    })
})
