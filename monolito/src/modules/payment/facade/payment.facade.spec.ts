import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import sequelize from '../repository/sequelize'
import TransactionModel from '../repository/transaction.model'
import { TransactionRepository } from '../repository/transaction.repository'
import { ProcessPaymentUsecase } from '../usecases/process-payment/process-payment.usecase'
import { PaymentFacade } from './payment.facade'

describe('Process payment usecase test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await TransactionModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should process payment with status approved', async () => {
        const transactionRepository = new TransactionRepository()
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        const paymentFacade = new PaymentFacade(processPayment)
        const output = await paymentFacade.processPayment({
            orderId: '1',
            amount: 100
        })
        const savedPayment = await transactionRepository.find(output.transactionId)
        expect(savedPayment.id).toBe(output.transactionId)
        expect(savedPayment.orderId).toBe('1')
        expect(savedPayment.status).toBe('approved')         
        expect(savedPayment.amount).toBe(100)           
    })

    it('should process payment with status declined', async () => {
        const transactionRepository = new TransactionRepository()
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        const paymentFacade = new PaymentFacade(processPayment)
        const output = await paymentFacade.processPayment({
            orderId: '1',
            amount: 99.99
        })
        const savedPayment = await transactionRepository.find(output.transactionId)
        expect(savedPayment.id).toBe(output.transactionId)
        expect(savedPayment.orderId).toBe('1')
        expect(savedPayment.status).toBe('declined')         
        expect(savedPayment.amount).toBe(99.99)           
    })

    it('should not process payment if invalid amount', async () => {
        const transactionRepository = new TransactionRepository()
        const processPayment = new ProcessPaymentUsecase(transactionRepository)
        const paymentFacade = new PaymentFacade(processPayment)
        await expect(paymentFacade.processPayment({
            orderId: '1',
            amount: -100
        })).rejects.toThrow('invalid amount')
    })
})
