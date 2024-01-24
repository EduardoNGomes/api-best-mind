import request from 'supertest'
import { app } from '@/server'
import { Products } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'

let MockProduct: Products

describe('[PUTCH]/product/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockProduct = await productFactory.createProductToE2ETest({})

    await prisma.products.create({ data: MockProduct })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete user', async () => {
    const response = await request(app.server)
      .put(`/product/${MockProduct.id}`)
      .field('name', 'Product Updated')

    const updatedProduct = await prisma.products.findUnique({
      where: { id: MockProduct.id },
    })

    console.log(updatedProduct)
    expect(response.status).toEqual(200)
    if (updatedProduct) expect(updatedProduct.name).toEqual('Product Updated')
  })
})
