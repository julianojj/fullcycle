import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import app from './main'
import checkoutSequelize from './modules/checkout/repository/sequelize'
import clientAdmSequelize from './modules/client-adm/repository/sequelize'
import invoiceSequelize from './modules/invoice/repository/sequelize'
import paymentSequelize from './modules/payment/repository/sequelize'
import productSequelize from './modules/product-adm/repository/sequelize'
import catalogSequelize from './modules/store-catalog/repository/sequelize'

describe('API', () => {
    beforeEach(async () => {
        await checkoutSequelize.sync()
        await clientAdmSequelize.sync()
        await invoiceSequelize.sync()
        await paymentSequelize.sync()
        await catalogSequelize.sync()
        await productSequelize.sync()
    })

    it('should create a new client', async () => {
        const response = await request(app).post('/clients').send({
            name: 'test name',
            email: 'juliano@test.com',
            address: {
                street: 'street test',
                complement: 'complement test',
                city: 'city test',
                state: 'state test',
                zipCode: 'zipCode test'

            }
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
        expect(response.body.name).toBe('test name')
        expect(response.body.email).toBe('juliano@test.com')
        expect(response.body.address._street).toBe('street test')
        expect(response.body.address._complement).toBe('complement test')
        expect(response.body.address._city).toBe('city test')
        expect(response.body.address._state).toBe('state test')
        expect(response.body.address._zipCode).toBe('zipCode test')
    })

    it('should create a new product', async () => {
        const response = await request(app).post('/products').send({
            name: 'test name',
            description: 'test description',
            price: 100,
            stock: 10
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('id')
    })

    it('should place order', async () => {
        const client = await request(app).post('/clients').send({
            name: 'test name',
            email: 'juliano@test.com',
            address: {
                street: 'street test',
                complement: 'complement test',
                city: 'city test',
                state: 'state test',
                zipCode: 'zipCode test'

            }
        })

        const product1 = await request(app).post('/products').send({
            name: 'test name',
            description: 'test description',
            price: 100,
            stock: 10
        })

        const product2 = await request(app).post('/products').send({
            name: 'test name 2',
            description: 'test description 2',
            price: 200,
            stock: 5
        })

        const checkout = await request(app).post('/checkout').send({
            clientId: client.body.id,
            document: '111.111.111-11',
            items: [
                {
                    productId: product1.body.id,
                    quantity: 1
                },
                {
                    productId: product2.body.id,
                    quantity: 2
                }
            ]
        })
        expect(checkout.status).toBe(201)
        expect(checkout.body).toHaveProperty('orderId')
        const invoice = await request(app).get(`/invoice/${checkout.body.invoiceId}`)
        expect(invoice.status).toBe(200)
        expect(invoice.body).toHaveProperty('id')
        expect(invoice.body.orderId).toBe(checkout.body.id)
        expect(invoice.body.document).toBe('111.111.111-11')
        expect(invoice.body.items).toHaveLength(2)
        expect(invoice.body.total).toBe(300)
    })

    it('should return an error when place order if client not found', async () => {
        const checkout = await request(app).post('/checkout').send({
            clientId: '1',
            document: '111.111.111-11',
            items: [
                {
                    productId: '1',
                    quantity: 1
                }
            ]
        })
        expect(checkout.status).toBe(404)
        expect(checkout.body.message).toBe('client not found')
    })

    it('should return an error when place order if no products selected', async () => {
        const client = await request(app).post('/clients').send({
            name: 'test name',
            email: 'juliano@test.com',
            address: {
                street: 'street test',
                complement: 'complement test',
                city: 'city test',
                state: 'state test',
                zipCode: 'zipCode test'

            }
        })
        const checkout = await request(app).post('/checkout').send({
            clientId: client.body.id,
            document: '111.111.111-11',
            items: []
        })
        expect(checkout.status).toBe(422)
        expect(checkout.body.message).toBe('no products selected')
    })


    it('should return an error when place order if product not found', async () => {
        const client = await request(app).post('/clients').send({
            name: 'test name',
            email: 'juliano@test.com',
            address: {
                street: 'street test',
                complement: 'complement test',
                city: 'city test',
                state: 'state test',
                zipCode: 'zipCode test'

            }
        })
        const checkout = await request(app).post('/checkout').send({
            clientId: client.body.id,
            document: '111.111.111-11',
            items: [
                {
                    productId: '1',
                    quantity: 1
                }
            ]
        })
        expect(checkout.status).toBe(404)
        expect(checkout.body.message).toBe('Product not found')
    })

    it('should return an error when place order if no stock available', async () => {
        const client = await request(app).post('/clients').send({
            name: 'test name',
            email: 'juliano@test.com',
            address: {
                street: 'street test',
                complement: 'complement test',
                city: 'city test',
                state: 'state test',
                zipCode: 'zipCode test'

            }
        })
        const product = await request(app).post('/products').send({
            name: 'test name',
            description: 'test description',
            price: 100,
            stock: 0
        })
        const checkout = await request(app).post('/checkout').send({
            clientId: client.body.id,
            document: '111.111.111-11',
            items: [
                {
                    productId: product.body.id,
                    quantity: 1
                }
            ]
        })
        expect(checkout.status).toBe(422)
        expect(checkout.body.message).toBe('no stock available')
    })

    it('should return an erro when invoice not found', async () => {
        const invoice = await request(app).get('/invoice/1')
        expect(invoice.status).toBe(404)
        expect(invoice.body.message).toBe('invoice not found')
    })
})
