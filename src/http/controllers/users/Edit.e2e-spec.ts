import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'

let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[PUT]/user/:id', async () => {
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

  it('should update user', async () => {
    const response = await request(app.server)
      .put(`/user/${MockUser.id}`)
      .set('Cookie', `token=${MockToken};`)
      .send({ oldPassword: '123456', email: 'jonhDoeChanged@gmail.com' })

    const updatedUser = await prisma.users.findUnique({
      where: { email: 'jonhDoeChanged@gmail.com' },
    })

    expect(response.status).toEqual(204)
    if (updatedUser) expect(updatedUser.id).toEqual(MockUser.id)
  })
})
