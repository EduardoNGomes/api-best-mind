import { FastifyInstance } from 'fastify'
import { productsRoutes } from '../controlers/products'
import { usersRoutes } from '../controlers/users'
import { authenticateRoutes } from '../controlers/authenticate'

export async function Routes(app: FastifyInstance) {
  app.register(productsRoutes)
  app.register(usersRoutes)
  app.register(authenticateRoutes)
}
