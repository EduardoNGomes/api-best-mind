import { FastifyInstance } from 'fastify'
import { CreateUserController } from './Create'
import { FindUserByIdController } from './FindUnique'
import { DeleteUserController } from './Delete'
import { EditUserController } from './Edit'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/user', CreateUserController)
  app.get(
    '/user/:id',
    { onRequest: (request) => request.jwtVerify({ onlyCookie: true }) },
    FindUserByIdController,
  )
  app.delete(
    '/user/:id',
    { onRequest: (request) => request.jwtVerify({ onlyCookie: true }) },
    DeleteUserController,
  )
  app.put(
    '/user/:id',
    { onRequest: (request) => request.jwtVerify({ onlyCookie: true }) },
    EditUserController,
  )
}
