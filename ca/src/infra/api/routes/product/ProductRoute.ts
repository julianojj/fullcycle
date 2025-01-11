import { Application, NextFunction, Request, Response } from 'express'
import { CreateProduct } from '../../../../usecases/product/create/CreateProduct'
import { CreateProductInput } from '../../../../usecases/product/create/CreateProduct.dto'
import { FindProduct } from '../../../../usecases/product/find/FindProduct'
import { FindAllProducts } from '../../../../usecases/product/list/FindAllProducts'
import { UpdateProduct } from '../../../../usecases/product/update/UpdateProduct'

export class ProductRoute {
    constructor(
        readonly app: Application,
        readonly createProduct: CreateProduct,
        readonly findProduct: FindProduct,
        readonly findAllProducts: FindAllProducts,
        readonly updateProduct: UpdateProduct
    ) { }

    init(): void {
        this.app.post('/products', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const input: CreateProductInput = {
                    name: req.body.name,
                    price: req.body.price
                }
                const output = await this.createProduct.execute(input)
                res.status(201).json(output)
            } catch (err) {
                next(err)
            }
        })

        this.app.get('/products', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const products = await this.findAllProducts.execute()
                res.status(200).json(products)
            } catch (err) {
                next(err)
            }
        })

        this.app.get('/products/:productId', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const productId = req.params.productId
                const product = await this.findProduct.execute(productId)
                res.status(200).json(product)
            } catch (err) {
                next(err)
            }
        })

        this.app.put('/products', async (req: Request, res: Response, next: NextFunction) => {
            try {
                const input = {
                    productId: req.body.productId,
                    name: req.body.name,
                    price: req.body.price
                }
                await this.updateProduct.execute(input)
                res.sendStatus(204)
            } catch (err) {
                next(err)
            }
        })
    }
}
