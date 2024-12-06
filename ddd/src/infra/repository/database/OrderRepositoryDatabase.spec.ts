import { randomUUID } from 'crypto'
import { beforeEach, describe, expect, it } from 'vitest'
import { Item } from '../../../domain/entity/Item'
import { Order } from '../../../domain/entity/Order'
import CustomerModel from '../../database/sequelize/model/CustomerModel'
import OrderItemModel from '../../database/sequelize/model/OrderItemModel'
import OrderModel from '../../database/sequelize/model/OrderModel'
import { OrderRepositoryDatabase } from './OrderRepositoryDatabase'

describe('Order Repository Database Test', () => {

    beforeEach(async () => {
        await OrderModel.sync({ force: true })
        await OrderItemModel.sync({ force: true })
        await CustomerModel.sync({ force: true })
    })

    it('Save order', async () => {
        const orderRepositoryDatabase = new OrderRepositoryDatabase()
        const order = new Order(randomUUID(), randomUUID())
        order.addItem(new Item(randomUUID(), 'Product 1', 100), 2)
        await orderRepositoryDatabase.create(order)
        const result = await orderRepositoryDatabase.findById(order.id)
        expect(result.getTotalPrice()).toBe(200)
        expect(result.orderItems[0].item.name).toBe('Product 1')
        expect(result.orderItems[0].quantity).toBe(2)
        expect(result.orderItems[0].item.price).toBe(100)
        expect(result.customerId).toBe(order.customerId)
    })

    it('Update order', async () => {
        const orderRepositoryDatabase = new OrderRepositoryDatabase()
        const order = new Order(randomUUID(), randomUUID())
        order.addItem(new Item(randomUUID(), 'Product 1', 100), 2)
        await orderRepositoryDatabase.create(order)
        await orderRepositoryDatabase.findById(order.id)
        order.addItem(new Item(randomUUID(), 'Product 2', 200), 1)
        await orderRepositoryDatabase.update(order)
        const result = await orderRepositoryDatabase.findById(order.id)
        expect(result.getTotalPrice()).toBe(400)
    })

    it('Find all orders', async () => {
        const orderRepositoryDatabase = new OrderRepositoryDatabase()
        const order1 = new Order(randomUUID(), randomUUID())
        order1.addItem(new Item(randomUUID(), 'Product 1', 100), 2)
        await orderRepositoryDatabase.create(order1)
        const order2 = new Order(randomUUID(), randomUUID())
        order2.addItem(new Item(randomUUID(), 'Product 2', 200), 1)
        await orderRepositoryDatabase.create(order2)
        const result = await orderRepositoryDatabase.findAll()
        expect(result).toHaveLength(2)
    })

    it('Find order by id', async () => {
        const orderRepositoryDatabase = new OrderRepositoryDatabase()
        const order = new Order(randomUUID(), randomUUID())
        order.addItem(new Item(randomUUID(), 'Product 1', 100), 2)
        await orderRepositoryDatabase.create(order)
        const result = await orderRepositoryDatabase.findById(order.id)
        expect(result).toBeDefined()
        expect(result.id).toBe(order.id)
    })

    it('Should return undefined if order not found', () => {
        const orderRepositoryDatabase = new OrderRepositoryDatabase()
        return expect(orderRepositoryDatabase.findById(randomUUID())).resolves.toBeUndefined()
    })
})
