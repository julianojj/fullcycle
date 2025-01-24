import { afterAll, afterEach, beforeEach, describe, expect, it } from 'vitest'
import ClientModel from '../repository/client.model'
import { ClientRepository } from '../repository/client.repository'
import sequelize from '../repository/sequelize'
import { AddClientUsecase } from '../usecases/add-client/add-client.usecase'
import { FindClientUsecase } from '../usecases/find-client/find-client.usecase'
import { ClientAdmFacade } from './client-adm.facade'

describe('Client admin facade test', () => {
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
        const addClient = new AddClientUsecase(clientRepository)
        const findClient = new FindClientUsecase(clientRepository)
        const clientAdmFacade = new ClientAdmFacade(addClient, findClient)
        const output = await clientAdmFacade.addClient({
            name: 'Test Client',
            email: 'test@example.com',
            address: 'Test Address'
        })
        const savedClient = await clientRepository.find(output.id)
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
            address: 'Test Address'
        })
        const addClient = new AddClientUsecase(clientRepository)
        const findClient = new FindClientUsecase(clientRepository)
        const clientAdmFacade = new ClientAdmFacade(addClient, findClient)
        const client = await clientAdmFacade.findClient({
            id: '1'
        })
        expect(client.name).toBe('Test Client')
        expect(client.email).toBe('test@example.com')
        expect(client.address).toBe('Test Address') 
    })

    it('should throw error when client not found', async () => {
        const clientRepository = new ClientRepository()
        const addClient = new AddClientUsecase(clientRepository)
        const findClient = new FindClientUsecase(clientRepository)
        const clientAdmFacade = new ClientAdmFacade(addClient, findClient)
        await expect(clientAdmFacade.findClient({
            id: '1'
        })).rejects.toThrow('client not found')
    })
})
