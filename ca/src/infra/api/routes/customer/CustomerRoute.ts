import { Application, NextFunction, Request, Response } from 'express'
import CreateCustomer from '../../../../usecases/customer/create/CreateCustomer'
import { CreateCustomerInput } from '../../../../usecases/customer/create/CreateCustomer.dto'
import { FindCustomer } from '../../../../usecases/customer/find/FindCustomer'
import { FindAllCustomers } from '../../../../usecases/customer/list/FindAllCustomers'
import { UpdateCustomer } from '../../../../usecases/customer/update/UpdateCustomer'
import { UpdateCustomerInput } from '../../../../usecases/customer/update/UpdateCustomer.dto'

export class CustomerRoute {
    constructor(
        readonly app: Application,
        private readonly createCustomer: CreateCustomer,
        private readonly findCustomer: FindCustomer,
        private readonly findAllCustomers: FindAllCustomers,
        private readonly updateCustomer: UpdateCustomer
    ) { }

    init(): void {
        this.app.post('/customers', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const input: CreateCustomerInput = req.body
                const output = await this.createCustomer.execute(input)
                res.status(201).json(output)
            } catch (err) {
                next(err)
            }
        })

        this.app.get('/customers/:customerId', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const customerId = req.params.customerId
                const output = await this.findCustomer.execute(customerId)
                res.status(200).json(output)
            } catch (err) {
                next(err)
            }
        })

        this.app.get('/customers', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const customers = await this.findAllCustomers.execute()
                res.status(200).json(customers)
            } catch (err) {
                next(err)
            }
        })

        this.app.put('/customers', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const input: UpdateCustomerInput = {
                    ...req.body
                }
                await this.updateCustomer.execute(input)
                res.status(204).end()
            } catch (err) {
                next(err)
            }
        })
    }
}
