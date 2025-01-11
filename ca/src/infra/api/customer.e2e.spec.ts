import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'
import CustomerModel from '../database/sequelize/model/CustomerModel'
import app from './express'

describe('API customer', () => {
    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Create customer', async () => {
        const response = await request(app).post('/customers').send({
            name: 'juliano',
            street: 'test',
            city: 'test',
            state: 'test',
            zipCode: 1234
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('customerId')
        const responseCustomer = await request(app).get(`/customers/${response.body.customerId}`)
        expect(responseCustomer.status).toBe(200)
        expect(responseCustomer.body.name).toBe(('juliano'))
        expect(responseCustomer.body.street).toBe(('test'))
        expect(responseCustomer.body.city).toBe(('test'))
        expect(responseCustomer.body.state).toBe(('test'))
        expect(responseCustomer.body.zipCode).toBe('1234')
        expect(responseCustomer.body.rewardPoints).toBe(0)
    })

    it('Should return exception if customer not found', async () => {
        const response = await request(app).get('/customers/1')
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Customer not found')
    })

    it('Update customer', async () => {
        const response = await request(app).post('/customers').send({
            name: 'juliano',
            street: 'test',
            city: 'test',
            state: 'test',
            zipCode: 1234
        })
        const customerResponse = await request(app).get(`/customers/${response.body.customerId}`)
        expect(customerResponse.status).toBe(200)
        expect(customerResponse.body.name).toBe(('juliano'))
        expect(customerResponse.body.street).toBe(('test'))
        expect(customerResponse.body.city).toBe(('test'))
        expect(customerResponse.body.state).toBe(('test'))
        expect(customerResponse.body.zipCode).toBe('1234')
        const responseUpdate = await request(app).put('/customers').send({
            id: response.body.customerId,
            name: 'julianoo',
            street: 'teste',
            city: 'teste',
            state: 'teste',
            zipCode: 5678,
            rewardPoints: 15,
        })
        expect(responseUpdate.status).toBe(204)
        const updatedCustomerReponse = await request(app).get(`/customers/${response.body.customerId}`)
        expect(updatedCustomerReponse.status).toBe(200)
        expect(updatedCustomerReponse.body.name).toBe(('julianoo'))
        expect(updatedCustomerReponse.body.street).toBe(('teste'))
        expect(updatedCustomerReponse.body.city).toBe(('teste'))
        expect(updatedCustomerReponse.body.state).toBe(('teste'))
        expect(updatedCustomerReponse.body.zipCode).toBe('5678')
        expect(updatedCustomerReponse.body.rewardPoints).toBe(15)
    })

    it('Find all customers', async () => {
        await request(app).post('/customers').send({
            name: 'juliano',
            street: 'test',
            city: 'test',
            state: 'test',
            zipCode: 1234
        })
        await request(app).post('/customers').send({
            name: 'julianoo',
            street: 'teste',
            city: 'teste',
            state: 'teste',
            zipCode: 5678
        })
        const responseAll = await request(app).get('/customers')
        expect(responseAll.status).toBe(200)
        expect(responseAll.body.length).toBe(2)
        expect(responseAll.body[0].name).toBe(('juliano'))
        expect(responseAll.body[0].street).toBe(('test'))
        expect(responseAll.body[0].city).toBe(('test'))
        expect(responseAll.body[0].state).toBe(('test'))
        expect(responseAll.body[0].zipCode).toBe('1234')
        expect(responseAll.body[0].rewardPoints).toBe(0)
        expect(responseAll.body[1].name).toBe(('julianoo'))
        expect(responseAll.body[1].street).toBe(('teste'))
        expect(responseAll.body[1].city).toBe(('teste'))
        expect(responseAll.body[1].state).toBe(('teste'))
        expect(responseAll.body[1].zipCode).toBe('5678')
        expect(responseAll.body[1].rewardPoints).toBe(0)
    })
})
