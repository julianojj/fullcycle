import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Id } from '../../@shared/domain/value-object/id.value-object'
import { Order } from '../domain/order.entity'
import { Product } from '../domain/product.entity'
import { CheckoutRepository } from './checkout.repository'
import { OrderItemModel } from './order-item.model'
import { OrderModel } from './order.model'
import sequelize from './sequelize'

describe('Checkout repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await OrderItemModel.destroy({ where: {} })
        await OrderModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should save order', async () => {
        const checkoutRepository = new CheckoutRepository()
        const order = new Order({
            id: new Id('1'),
            clientId: '1'
        })
        order.addProduct(new Product({
            id: new Id('1'),
            name: 'Test Product',
            description: 'Test Product Description',
            salesPrice: 10.99
        }))
        await checkoutRepository.save(order)
        const savedOrder = await OrderModel.findOne({
            where: { id: order.id }
        })
        expect(savedOrder.id).toBe(order.id)
        expect(savedOrder.clientId).toBe('1')
        expect(savedOrder.status).toBe('pending_payment')
        expect(savedOrder.total).toBe(10.99)
        const savedOrderItems = await OrderItemModel.findAll({
            where: { orderId: order.id }
        })
        expect(savedOrderItems).toHaveLength(1)
        expect(savedOrderItems[0].orderId).toBe(order.id)
        expect(savedOrderItems[0].productId).toBe('1')
        expect(savedOrderItems[0].name).toBe('Test Product')
        expect(savedOrderItems[0].description).toBe('Test Product Description')
        expect(savedOrderItems[0].price).toBe(10.99)
    })

    it('should find order', async () => {
        await OrderModel.create({
            id: '1',
            clientId: '1',
            status: 'pending_payment',
            total: 10.99
        })
        await OrderItemModel.bulkCreate([
            {
                orderId: '1',
                productId: '1',
                name: 'Test Product',
                description: 'Test Product Description',
                price: 10.99
            }
        ])
        const checkoutRepository = new CheckoutRepository()
        const order = await checkoutRepository.find('1')
        expect(order.id).toBe('1')
        expect(order.clientId).toBe('1')
        expect(order.status).toBe('pending_payment')
        expect(order.calculateTotal()).toBe(10.99)
        expect(order.orderItems).toHaveLength(1)
        expect(order.orderItems[0].name).toBe('Test Product')
        expect(order.orderItems[0].description).toBe('Test Product Description')
        expect(order.orderItems[0].salesPrice).toBe(10.99)
    })
})