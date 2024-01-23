import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'

let MockUser: Users

describe('[DELETE]/user/:id', async () => {
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

  it('should delete user', async () => {
    const response = await request(app.server).delete(`/user/${MockUser.id}`)

    expect(response.status).toEqual(200)
  })
})
