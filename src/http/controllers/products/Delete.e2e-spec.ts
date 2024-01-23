import request from 'supertest'
import { app } from '@/server'
import { Products } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'

let MockProduct: Products

describe('[DELETE]/product/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockProduct = await productFactory.createProductToE2ETest({})

    await prisma.products.create({ data: MockProduct })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete user', async () => {
    const response = await request(app.server).delete(
      `/product/${MockProduct.id}`,
    )

    expect(response.status).toEqual(200)
  })
})
