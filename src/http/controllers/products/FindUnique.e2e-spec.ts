import request from 'supertest'
import { app } from '@/server'
import { Products, Users } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'

let MockProduct: Products

let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[GET]/product/:id', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })

    MockTokenEncrypter = new EncrypterJWT()

    MockToken = await MockTokenEncrypter.encrypt({ sub: MockUser.id })

    MockProduct = await productFactory.createProductToE2ETest({
      user_Id: MockUser.id,
    })

    await prisma.products.create({ data: MockProduct })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get unique user', async () => {
    const response = await request(app.server)
      .get(`/product/${MockProduct.id}`)
      .set('Cookie', `token=${MockToken};`)

    expect(response.body).toEqual({
      product: expect.objectContaining({
        name: MockProduct.name,
        description: MockProduct.description,
      }),
    })
  })
})
