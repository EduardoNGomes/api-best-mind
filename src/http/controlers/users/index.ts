import { FastifyInstance } from 'fastify'
import { CreateUserController } from './Create'
import { FindUserByIdController } from './FindUnique'
import { DeleteUserController } from './Delete'
import { EditUserController } from './Edit'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', CreateUserController)
  app.get('/user/:id', FindUserByIdController)
  app.delete('/user/:id', DeleteUserController)
  app.put('/user/:id', EditUserController)
}
