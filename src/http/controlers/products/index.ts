import { FastifyInstance } from 'fastify'
import { CreateProductController } from './Create'
import { FindProductByIdController } from './FindUnique'
import { FindAllProductsController } from './FindAll'
import { DeleteProductController } from './Delete'
import { EditProductController } from './Edit'

export async function productsRoutes(app: FastifyInstance) {
  app.post('/product', CreateProductController)
  app.get('/product', FindAllProductsController)
  app.get('/product/:id', FindProductByIdController)
  app.delete('/product/:id', DeleteProductController)
  app.put('/product/:id', EditProductController)
}
