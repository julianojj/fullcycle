import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Transaction } from '../domain/transaction.entity'
import sequelize from './sequelize'
import TransactionModel from './transaction.model'
import { TransactionRepository } from './transaction.repository'

describe('Product repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await TransactionModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should save transaction', async () => {
        const transactionRepository = new TransactionRepository()
        const transaction = new Transaction({
            orderId: '1',
            amount: 100,
            status: 'pending'
        })
        transaction.process()
        await transactionRepository.save(transaction)
        const savedTransaction = await TransactionModel.findOne({
            where: { id: transaction.id }
        })
        expect(savedTransaction.id).toBe(transaction.id)
        expect(savedTransaction.orderId).toBe('1')
        expect(savedTransaction.amount).toBe(100)
        expect(savedTransaction.status).toBe('approved')
    })

    it('should find transaction', async () => {
        await TransactionModel.create({
            id: '1',
            orderId: '1',
            amount: 100,
            status: 'approved',
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const transactionRepository = new TransactionRepository()
        const savedTransaction = await transactionRepository.find('1')
        expect(savedTransaction.id).toBe('1')
        expect(savedTransaction.orderId).toBe('1')
        expect(savedTransaction.amount).toBe(100)
        expect(savedTransaction.status).toBe('approved')
    })
})
