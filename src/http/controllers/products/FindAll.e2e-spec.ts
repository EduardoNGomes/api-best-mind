import request from 'supertest'
import { app } from '@/server'
import { Products } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'

let MockProduct: Products

describe('[GET]/product', async () => {
  beforeAll(async () => {
    await app.ready()

    for (let i = 1; i <= 10; i++) {
      MockProduct = await productFactory.createProductToE2ETest({
        name: `product-${i}`,
      })
      await prisma.products.create({ data: MockProduct })
    }
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all products', async () => {
    const response = await request(app.server).get(`/product`)

    expect(response.status).toEqual(200)
    expect(response.body.products).toHaveLength(10)
  })
})
