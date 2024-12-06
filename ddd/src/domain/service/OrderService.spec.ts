import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { EventObserver } from '../../infra/event/EventObserver'
import { SendEmailWhenOrderPlaced } from '../../infra/event/SendEmailWhenOrderPlaced'
import { Address, Customer } from '../entity/Customer'
import { Item } from '../entity/Item'
import { Order } from '../entity/Order'
import { OrderService } from './OrderService'

describe('OrderService test', () => {
    it('Should place an order', () => {
        const observer = new EventObserver()
        const hander = new SendEmailWhenOrderPlaced()
        observer.register(hander)
        const order = new Order(randomUUID(), "1")
        order.addItem(new Item(randomUUID(), "Item 1", 10), 2)
        const customer = new Customer(randomUUID(), 'John Doe', new Address("123 Main St", "Anytown", "CA", "12345"))
        OrderService.placeOrder(order, customer)
        expect(customer.rewardPoints).toBe(10)
    })
})