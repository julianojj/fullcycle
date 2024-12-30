import { beforeEach, describe, expect, it } from 'vitest'
import { CustomerRepositoryDatabase } from '../../../infra/customer/repository/database/CustomerRepositoryDatabase'
import CustomerModel from '../../../infra/database/sequelize/model/CustomerModel'
import { FindAllCustomers } from './FindAllCustomers'

describe('FindAllCustomers test', () => {
    beforeEach(async () => {
        await CustomerModel.sync({ force: true })
    })

    it('Should return all customers', async () => {
        const customerRepository = new CustomerRepositoryDatabase()
        const findAllCustomers = new FindAllCustomers(customerRepository)
        const customers = await findAllCustomers.execute()
        expect(customers).toHaveLength(0)
    })
})