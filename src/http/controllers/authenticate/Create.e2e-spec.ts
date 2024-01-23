import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'

let MockUser: Users

describe('[E2E]/auth ', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create an state', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ email: MockUser.email, password: '123456' })

    expect(response.body).toHaveProperty('accessToken')
  })
})
