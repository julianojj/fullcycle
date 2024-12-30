import { beforeEach, describe, expect, it } from 'vitest'
import { ExceptionMessages } from '../../../exception/ValidationException'
import { CustomerRepositoryDatabase } from '../../../infra/customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../../../infra/database/sequelize/model/CustomerModel'
import { FindCustomer } from './FindCustomer'

describe('FindCustomer test', () => {
    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Return exception if user not found', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const findCustomer = new FindCustomer(customerRepository)
        await expect(() => findCustomer.execute('')).rejects.toThrowError(ExceptionMessages.ErrCustomerNotFound)
    })
})
