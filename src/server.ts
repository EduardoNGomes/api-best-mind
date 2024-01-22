import fastify from 'fastify'
import { Routes } from './http/routes'
import { env } from './env'
import multer from 'fastify-multer'
import { UPLOADS_FOLDER } from './config/multer'
import { join } from 'path'
import staticFiles from '@fastify/static'
import JWT from '@fastify/jwt'

export const app = fastify()

app.register(multer.contentParser)
app.register(JWT, {
  secret: env.SECRETE_KEY,
})
app.register(Routes)

app.register(staticFiles, {
  root: join(UPLOADS_FOLDER),
})

app.listen({ port: env.PORT }).then(() => {
  console.log('server is running on port ' + env.PORT)
})
