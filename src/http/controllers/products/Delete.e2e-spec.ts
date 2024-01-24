import request from 'supertest'
import { app } from '@/server'
import { Products, Users } from '@prisma/client'
import productFactory from '../../../../test/factories/product'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'
import userFactory from '../../../../test/factories/user'

let MockProduct: Products

let MockUser: Users
let token: string
let tokenEncrypter: EncrypterJWT

describe('[DELETE]/product/:id', async () => {
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
    tokenEncrypter = new EncrypterJWT()

    token = await tokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete user', async () => {
    const response = await request(app.server)
      .delete(`/product/${MockProduct.id}`)
      .set('Cookie', `token=${token};`)

    expect(response.status).toEqual(200)
  })
})
