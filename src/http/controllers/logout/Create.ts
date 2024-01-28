import { FastifyReply, FastifyRequest } from 'fastify'
import { env } from 'process'

export async function logoutController(_: FastifyRequest, reply: FastifyReply) {
  return reply
    .status(204)
    .setCookie('token', '', {
      domain: env.DOMAIN_COOKIE,
      path: '/',
      secure: true,
      httpOnly: true,
      sameSite: `none`,
    })
    .send()
}
