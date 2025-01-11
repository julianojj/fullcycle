import { describe, expect, it } from 'vitest'
import { Notification } from './notification'

describe('Notification test', () => {
    it('Notification for customer', () => {
        const notification = new Notification()
        const error = {
            message: 'customer error',
            context: 'customer'
        }
        notification.addError(error)
        expect(notification.messages()).toEqual('customer: customer error,')
        const error2 = {
            message: 'address error',
            context: 'address'
        }
        notification.addError(error2)
        expect(notification.messages()).toEqual('customer: customer error,address: address error,')
        expect(notification.messages('customer')).toEqual('customer: customer error,')
        expect(notification.messages('address')).toEqual('address: address error,')
        expect(notification.hasError()).toBe(true)
        expect(notification.errors()).toEqual([error, error2])
    })
})
