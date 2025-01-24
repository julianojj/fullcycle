import { describe, expect, it, vitest } from 'vitest'
import { FindClientUsecase } from './find-client.usecase'

describe('Find client usecase test', () => {
    it('should find client', async () => {
        const clientRepository = {
            add: vitest.fn(),
            find: vitest.fn().mockResolvedValue({
                id: '1',
                name: 'Test Client',
                email: 'test@example.com',
                address: 'Test Address'
            })
        }
        const findClient = new FindClientUsecase(clientRepository)
        const client = await findClient.execute('1')
        expect(client.id).toBe('1')
        expect(client.name).toBe('Test Client')
        expect(client.email).toBe('test@example.com')
        expect(client.address).toBe('Test Address') 
    })

    it('should throw error when client not found', async () => {
        const clientRepository = {
            add: vitest.fn(),
            find: vitest.fn().mockResolvedValue(null)
        }
        const findClient = new FindClientUsecase(clientRepository)
        await expect(findClient.execute('1')).rejects.toThrow('client not found')
    })
})
