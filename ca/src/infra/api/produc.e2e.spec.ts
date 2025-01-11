import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import ProductModel from '../database/sequelize/model/ProductModel'
import app from './express'

describe('API product', () => {
    beforeEach(async () => {
        await ProductModel.sync({ force: true })
    })

    it('Create product', async () => {
        const response = await request(app).post('/products').send({
            name: 'Test Product',
            price: 10.99
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('productId')
        const responseProduct = await request(app).get(`/products/${response.body.productId}`)
        expect(responseProduct.status).toBe(200)
        expect(responseProduct.body.name).toBe(('Test Product'))
        expect(responseProduct.body.price).toBe(10.99)
    })

    it('Should return exception if product not found', async () => {
        const response = await request(app).get('/products/1')
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Product not found')
    })

    it('Update product', async () => {
        const response = await request(app).post('/products').send({
            name: 'Test Product',
            price: 10.99
        })
        const productResponse = await request(app).get(`/products/${response.body.productId}`)
        expect(productResponse.status).toBe(200)
        expect(productResponse.body.name).toBe(('Test Product'))
        expect(productResponse.body.price).toBe(10.99)
        const responseUpdate = await request(app).put('/products').send({
            productId: response.body.productId,
            name: 'Test Product Updated',
            price: 15.99,
        })
        expect(responseUpdate.status).toBe(204)
        const updatedProductReponse = await request(app).get(`/products/${response.body.productId}`)
        expect(updatedProductReponse.status).toBe(200)
        expect(updatedProductReponse.body.name).toBe(('Test Product Updated'))
        expect(updatedProductReponse.body.price).toBe(15.99)
    })

    it('Find all products', async () => {
        await request(app).post('/products').send({
            name: 'Test Product 1',
            price: 10.99
        })
        await request(app).post('/products').send({
            name: 'Test Product 2',
            price: 20.99
        })
        const responseProducts = await request(app).get('/products')
        expect(responseProducts.status).toBe(200)
        expect(responseProducts.body).toHaveLength(2)
        expect(responseProducts.body[0].name).toBe('Test Product 1')
        expect(responseProducts.body[0].price).toBe(10.99)
        expect(responseProducts.body[1].name).toBe('Test Product 2')
        expect(responseProducts.body[1].price).toBe(20.99)
    })
})
