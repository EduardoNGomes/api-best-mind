import { FastifyInstance } from 'fastify'
import { AuthenticateController } from './Create'

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/auth', AuthenticateController)
}
