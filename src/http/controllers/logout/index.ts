import { FastifyInstance } from 'fastify'
import { logoutController } from './Create'

export async function logoutRoutes(app: FastifyInstance) {
  app.post('/logout', logoutController)
}
