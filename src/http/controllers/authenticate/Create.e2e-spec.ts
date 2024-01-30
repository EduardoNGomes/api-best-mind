import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'

let MockUser: Users

describe('[POST]/auth ', async () => {
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

  it('should authenticate user', async () => {
    const response = await request(app.server)
      .post('/auth')
      .send({ email: MockUser.email, password: '123456' })

    expect(response.headers).toHaveProperty('set-cookie')
    expect(response.status).toEqual(201)
  })
})
