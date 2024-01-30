import request from 'supertest'
import { app } from '@/server'
import { resolve } from 'path'

import { Users } from '@prisma/client'

import userFactory from '../../../../test/factories/user'
import { prisma } from '@/repositories/prisma/connection'
import { EncrypterJWT } from '@/cryptography/jwt/EncrypterJWT'
import { randomUUID } from 'crypto'

let MockUser: Users
let MockToken: string
let MockTokenEncrypter: EncrypterJWT

describe('[POST]/product ', async () => {
  beforeAll(async () => {
    await app.ready()

    MockUser = await userFactory.createUserToE2ETest({
      email: 'jonhDoe@gmail.com',
      password: '123456',
    })

    await prisma.users.create({ data: MockUser })
    MockTokenEncrypter = new EncrypterJWT()

    MockToken = await MockTokenEncrypter.encrypt({ sub: MockUser.id })
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create product', async () => {
    const response = await request(app.server)
      .post('/product')
      .set('Cookie', `token=${MockToken};`)
      .attach(
        'image',
        resolve(__dirname, '..', '..', '..', '..', 'assets', 'headphone.jpg'),
      )
      .field('name', 'phone')
      .field('id', randomUUID())
      .field('description', 'description headphone')
      .field('price', '15.0')

    expect(response.status).toEqual(201)
  })
})
