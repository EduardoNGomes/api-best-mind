import { FastifyInstance } from 'fastify'
import { productsRoutes } from '../controllers/products'
import { usersRoutes } from '../controllers/users'
import { authenticateRoutes } from '../controllers/authenticate'
import { logoutRoutes } from '../controllers/logout'

export async function Routes(app: FastifyInstance) {
  app.register(productsRoutes)
  app.register(usersRoutes)
  app.register(authenticateRoutes)
  app.register(logoutRoutes)
}
