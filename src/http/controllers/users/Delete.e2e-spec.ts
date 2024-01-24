import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'

let MockUser: Users
let token: string
let tokenEncrypter: EncrypterJWT

describe('[DELETE]/user/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })
    tokenEncrypter = new EncrypterJWT()

    token = await tokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete user', async () => {
    const response = await request(app.server)
      .delete(`/user/${MockUser.id}`)
      .set('Cookie', `token=${token};`)

    expect(response.status).toEqual(200)
  })
})
