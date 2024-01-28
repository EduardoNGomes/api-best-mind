import request from 'supertest'
import { app } from '@/server'

describe('[POST]/logout ', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should logout user', async () => {
    const response = await request(app.server).post('/logout')
    expect(response.headers).toHaveProperty('set-cookie')
    expect(response.status).toEqual(204)
  })
})
