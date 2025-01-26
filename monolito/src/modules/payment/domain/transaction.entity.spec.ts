import { describe, expect, it } from 'vitest'
import { Transaction } from './transaction.entity'

describe('Transaction test', () => {
    it('should create a transaction', () => {
        const transaction = new Transaction({
            orderId: 'any-order-id',
            amount: 10.99,
            status: 'pending'
        })
        expect(transaction.id).toBeDefined()
        expect(transaction.orderId).toBe('any-order-id')
        expect(transaction.amount).toBe(10.99)
        expect(transaction.status).toBe('pending')
    })

    it('should throw exception when amount is negative', () => {
        expect(() => new Transaction({
            orderId: 'any-order-id',
            amount: -10.99,
            status: 'pending'
        })).toThrow('invalid amount')
    })

    it('should approve a transaction', () => {
        const transaction = new Transaction({
            orderId: 'any-order-id',
            amount: 100,
            status: 'pending'
        })
        transaction.process()
        expect(transaction.status).toBe('approved') 
    })

    it('should decline a transaction', () => {
        const transaction = new Transaction({
            orderId: 'any-order-id',
            amount: 10.99,
            status: 'pending'
        })
        transaction.process()
        expect(transaction.status).toBe('declined')
    })
})

