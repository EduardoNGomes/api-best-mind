import fastify from 'fastify'
import { Routes } from './http/routes'
import { env } from './env'

export const app = fastify()

app.register(Routes)

app.listen({ port: env.PORT }).then(() => {
  console.log('server is running on port ' + env.PORT)
})
