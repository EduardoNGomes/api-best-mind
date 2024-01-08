import fastify from 'fastify'
import { Routes } from './http/routes'

const app = fastify()

app.register(Routes)

app.listen({ port: 8080 }).then(() => {
  console.log('server is running')
})
