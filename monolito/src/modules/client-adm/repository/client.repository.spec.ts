import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Client } from '../domain/client.entity'
import ClientModel from './client.model'
import { ClientRepository } from './client.repository'
import sequelize from './sequelize'

describe('Product repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await ClientModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should add client', async () => {
        const clientRepository = new ClientRepository()
        const client = new Client({
            name: 'Test Client',
            email: 'test@example.com',
            address: 'Test Address'     
        })
        await clientRepository.add(client)
        const savedClient = await ClientModel.findOne({
            where: { id: client.id }
        })
        expect(savedClient.id).toBe(client.id)
        expect(savedClient.name).toBe('Test Client')
        expect(savedClient.email).toBe('test@example.com')
        expect(savedClient.address).toBe('Test Address')
    })

    it('should find client', async () => {
        const clientRepository = new ClientRepository()
        await ClientModel.create({
            id: '1',
            name: 'Test Client',
            email: 'test@example.com',
            address: 'Test Address',
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const savedClient = await clientRepository.find('1')
        expect(savedClient.id).toBe('1')
        expect(savedClient.name).toBe('Test Client')
        expect(savedClient.email).toBe('test@example.com')
        expect(savedClient.address).toBe('Test Address')
    })

    it('should return null if customer not found', () => {
        const clientRepository = new ClientRepository()
        return expect(clientRepository.find('1')).resolves.toBeNull()
    })
})
