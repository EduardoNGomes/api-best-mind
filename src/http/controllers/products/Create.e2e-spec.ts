import request from 'supertest'
import { app } from '@/server'
import { resolve } from 'path'

describe('[POST]/product ', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create product', async () => {
    const response = await request(app.server)
      .post('/product')
      .attach(
        'image',
        resolve(__dirname, '..', '..', '..', '..', 'assets', 'headphone.jpg'),
      )
      .field('name', 'phone')
      .field('description', 'description headphone')
      .field('price', '15.0')

    expect(response.status).toEqual(201)
  })
})
