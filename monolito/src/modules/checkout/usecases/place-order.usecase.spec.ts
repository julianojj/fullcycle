import { describe, expect, it, vitest } from 'vitest'
import { PlaceOrder } from './place-order.usecase'


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
        const output = await placeOrder.execute({
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

    it('should place order when declined payment', async () => {
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
                status: 'declined',
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
        const output = await placeOrder.execute({
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
        expect(output.status).toBe('declined_payment')
    })

    it('should throw an erro when no stock available', async () => {
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
            processPayment: vitest.fn()
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
            stock: 0

        })
        productFacade.checkStock.mockResolvedValueOnce({
            id: '2',
            stock: 10

        })
        const placeOrder = new PlaceOrder(clientAdmFacade, storeCatalogFacade, productFacade, paymentFacade, invoiceFacade)
        await expect(placeOrder.execute({
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
        })).rejects.toThrowError('no stock available')
    })

    it('should throw an erro when client not found', async () => {
        const clientAdmFacade = {
            addClient: vitest.fn(),
            findClient: vitest.fn().mockRejectedValue(new Error('client not found'))
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
            processPayment: vitest.fn()
        }
        const invoiceFacade = {
            generateInvoice: vitest.fn().mockResolvedValueOnce({
                invoiceId: '1',
                status: 'pending',
                total: 300
            }),
            findInvoice: vitest.fn()
        }
        const placeOrder = new PlaceOrder(clientAdmFacade, storeCatalogFacade, productFacade, paymentFacade, invoiceFacade)
        await expect(placeOrder.execute({
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
        })).rejects.toThrowError('client not found')
    })

    it('should throw an error when no products selected', async () => {
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
                total: 0
            }),
            findInvoice: vitest.fn()
        }
        const placeOrder = new PlaceOrder(clientAdmFacade, storeCatalogFacade, productFacade, paymentFacade, invoiceFacade)
        await expect(placeOrder.execute({
            clientId: '1',
            document: '111.111.111-11',
            items: []
        })).rejects.toThrow('no products selected')
    })
})
