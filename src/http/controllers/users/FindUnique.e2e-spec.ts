import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'

let MockUser: Users

describe('[GET]/user/:id', async () => {
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

  it('should get user', async () => {
    const response = await request(app.server).get(`/user/${MockUser.id}`)

    expect(response.body).toEqual({
      user: expect.objectContaining({
        email: MockUser.email,
        password: MockUser.password,
        name: MockUser.name,
      }),
    })
  })
})
