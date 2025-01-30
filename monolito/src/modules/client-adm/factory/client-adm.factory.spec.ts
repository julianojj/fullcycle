import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import ClientModel from '../repository/client.model'
import sequelize from '../repository/sequelize'
import { ClientAdmFacadeFactory } from './client-adm.factory'


describe('Client repository test', () => {
    beforeEach(async () => {
        await sequelize.sync()
    })

    afterEach(async () => {
        await ClientModel.destroy({ where: {} })
    })

    afterAll(async () => {
        await sequelize.close() 
    })

    it('should create client', async () => {
        const clientAdmFactory = ClientAdmFacadeFactory.create()
        const output = await clientAdmFactory.addClient({
            name: 'Test Client',
            email: 'test@example.com',
            address: {
                street: 'Test Street',
                complement: 'Test Complement',
                city: 'Test City',
                state: 'Test State',
                zipCode: '12345'
            }
        })
        const savedClient = await ClientModel.findOne({
            where: { id: output.id }
        })
        expect(savedClient.id).toBe(output.id)
        expect(savedClient.name).toBe('Test Client')    
        expect(savedClient.email).toBe('test@example.com')
    })

    it('should find client', async () => {
        const clientAdmFactory = ClientAdmFacadeFactory.create()
        await ClientModel.create({
            id: '1',
            name: 'Test Client',
            email: 'test@example.com',
            complement: 'Test complement',
            street: 'Test Street',
            city: 'Test City',
            state: 'Test State',
            zipCode: '12345'
        })
        const result = await clientAdmFactory.findClient({ id: '1' })
        expect(result.id).toBe('1')
        expect(result.name).toBe('Test Client')
        expect(result.email).toBe('test@example.com')
        expect(result.address.street).toBe('Test Street')
        expect(result.address.complement).toBe('Test complement')
        expect(result.address.city).toBe('Test City')
        expect(result.address.state).toBe('Test State')
        expect(result.address.zipCode).toBe('12345')
    })

    it('should return exception if client not found', async () => {
        const clientAdmFactory = ClientAdmFacadeFactory.create()
        await expect(clientAdmFactory.findClient({ id: '1' })).rejects.toThrow('client not found')
    })
})
