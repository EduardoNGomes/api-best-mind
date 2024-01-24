import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'

let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[GET]/user/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })
    MockTokenEncrypter = new EncrypterJWT()

    MockToken = await MockTokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get user', async () => {
    const response = await request(app.server)
      .get(`/user/${MockUser.id}`)
      .set('Cookie', `token=${MockToken};`)

    expect(response.body).toEqual({
      user: expect.objectContaining({
        email: MockUser.email,
        password: MockUser.password,
        name: MockUser.name,
      }),
    })
  })
})
