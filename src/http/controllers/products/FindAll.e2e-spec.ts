import request from 'supertest'
import { app } from '@/server'
import { Products, Users } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'

import userFactory from '../../../../test/factories/user'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'

let MockProduct: Products

let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[GET]/product', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })

    for (let i = 1; i <= 10; i++) {
      MockProduct = await productFactory.createProductToE2ETest({
        name: `product-${i}`,
        user_Id: MockUser.id,
      })
      await prisma.products.create({ data: MockProduct })
    }

    MockTokenEncrypter = new EncrypterJWT()

    MockToken = await MockTokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get all products', async () => {
    const response = await request(app.server)
      .get(`/product`)
      .set('Cookie', `token=${MockToken};`)

    expect(response.status).toEqual(200)
    expect(response.body.products).toHaveLength(10)
  })
})
