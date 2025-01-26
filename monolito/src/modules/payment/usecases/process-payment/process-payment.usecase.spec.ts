import { describe, expect, it, vitest } from 'vitest'
import { ProcessPaymentUsecase } from './process-payment.usecase'

describe('Process payment usecase test', () => {
    it('should process payment with status approved', async () => {
        const transactionRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        const output = await processPayment.execute({
            orderId: '1',
            amount: 100
        })
        transactionRepository.find.mockResolvedValue({
            id: output.transactionId,
            orderId: '1',
            amount: 100,
            status: 'approved',
            createdAt: new Date(),
            updatedAt: new Date()   
        })
        const savedPayment = await transactionRepository.find(output.transactionId)
        expect(savedPayment.id).toBe(output.transactionId)
        expect(savedPayment.orderId).toBe('1')
        expect(savedPayment.amount).toBe(100)
        expect(savedPayment.status).toBe('approved')
    })

    it('should process payment with status declined', async () => {
        const transactionRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        const output = await processPayment.execute({
            orderId: '1',
            amount: 99.99
        })
        transactionRepository.find.mockResolvedValue({
            id: output.transactionId,
            orderId: '1',
            amount: 99.99,
            status: 'declined',
            createdAt: new Date(),
            updatedAt: new Date()   
        })
        const savedPayment = await transactionRepository.find(output.transactionId)
        expect(savedPayment.id).toBe(output.transactionId)
        expect(savedPayment.orderId).toBe('1')
        expect(savedPayment.amount).toBe(99.99)
        expect(savedPayment.status).toBe('declined')
    })

    it('should not process payment if invalid amount', async () => {
        const transactionRepository = {
            save: vitest.fn(),
            find: vitest.fn()
        }
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        await expect(processPayment.execute({
            orderId: '1',
            amount: -100
        })).rejects.toThrow('invalid amount')   
    })
})
