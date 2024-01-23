import request from 'supertest'
import { app } from '@/server'
import { Users } from '@prisma/client'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'

let MockUser: Users

describe('[PUT]/user/:id', async () => {
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

  it('should update user', async () => {
    const response = await request(app.server)
      .put(`/user/${MockUser.id}`)
      .send({ oldPassword: '123456', email: 'jonhDoeChanged@gmail.com' })

    const updatedUser = await prisma.users.findUnique({
      where: { email: 'jonhDoeChanged@gmail.com' },
    })

    expect(response.status).toEqual(204)
    if (updatedUser) expect(updatedUser.id).toEqual(MockUser.id)
  })
})
