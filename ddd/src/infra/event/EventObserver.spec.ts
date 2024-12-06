import { describe, expect, it } from 'vitest'
import { OrderPlacedEvent } from '../../domain/event/Event'
import { EventObserver } from './EventObserver'
import { SendEmailWhenOrderPlaced } from './SendEmailWhenOrderPlaced'

describe('EventObserver test', () => {

    it('Should register events', () => {
        const observer = new EventObserver()
        const handler = new SendEmailWhenOrderPlaced()
        observer.register(handler)
        expect(observer.handlers).toContain(handler)
    })

    it('Should unregister events', () => {
        const observer = new EventObserver()
        const handler = new SendEmailWhenOrderPlaced()
        observer.register(handler)
        observer.unregister(handler)
        expect(observer.handlers).not.toContain(handler)
    })

    it('Should notify events', () => {
        const observer = new EventObserver()
        const handler = new SendEmailWhenOrderPlaced()
        observer.register(handler)
        const event = new OrderPlacedEvent({
            customerId: '1',
            orderId: '1',
            items: [],
            total: 0,
            email: 'test@example.com'
        })
        observer.notify('OrderPlaced', event)
        expect(observer.handlers).toHaveLength(1)
        observer.unregister(handler)
        expect(observer.handlers).toHaveLength(0)
    })
})
