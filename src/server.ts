import fastify from 'fastify'
import { Routes } from './http/routes'
import { env } from './env'
import multer from 'fastify-multer'
import { UPLOADS_FOLDER } from './config/multer'
import { join } from 'path'
import staticFiles from '@fastify/static'
import JWT from '@fastify/jwt'
import cookie from '@fastify/cookie'
import { ZodError } from 'zod'

export const app = fastify()

app.register(multer.contentParser)

app.register(JWT, {
  secret: env.SECRET_KEY,
  cookie: { cookieName: 'token', signed: false },
})
app.register(cookie)
app.register(Routes)

app.register(staticFiles, {
  root: join(UPLOADS_FOLDER),
})

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'internal server error.' })
})
