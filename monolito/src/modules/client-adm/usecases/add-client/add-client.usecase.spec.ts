import { describe, expect, it, vitest } from 'vitest'
import { AddClientUsecase } from './add-client.usecase'

describe('Add client usecase test', () => {
    it('should add client', async () => {
        const clientRepository = {
            add: vitest.fn(),
            find: vitest.fn().mockResolvedValue({
                id: '1',
                name: 'Test Client',
                email: 'test@example.com',
                address: 'Test Address'
            })
        }
        const addClient = new AddClientUsecase(clientRepository)
        const input = {
            name: 'Test Client',
            email: 'test@example.com',
            address: 'Test Address'
        }
        const output = await addClient.execute(input)
        const customer = await clientRepository.find(output.id)
        expect(customer.name).toBe(input.name)
        expect(customer.email).toBe(input.email)
        expect(customer.address).toBe(input.address)
    })
})
