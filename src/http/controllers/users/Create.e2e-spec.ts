import request from 'supertest'
import { app } from '@/server'

describe('[POST]/user ', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create user', async () => {
    const response = await request(app.server).post('/user').send({
      email: 'johnDoe@email.com',
      password: '123456',
      name: 'john Doe',
    })

    expect(response.status).toEqual(201)
  })
})
