import request from 'supertest'
import { app } from '@/server'
import { Products, Users } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'
import userFactory from '../../../../test/factories/user'

let MockProduct: Products
let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[PUTCH]/product/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })

    MockProduct = await productFactory.createProductToE2ETest({
      user_Id: MockUser.id,
    })

    await prisma.products.create({ data: MockProduct })

    MockTokenEncrypter = new EncrypterJWT()

    MockToken = await MockTokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete user', async () => {
    const response = await request(app.server)
      .put(`/product/${MockProduct.id}`)
      .set('Cookie', `token=${MockToken};`)
      .field('name', 'Product Updated')

    const updatedProduct = await prisma.products.findUnique({
      where: { id: MockProduct.id },
    })

    expect(response.status).toEqual(200)
    if (updatedProduct) expect(updatedProduct.name).toEqual('Product Updated')
  })
})
