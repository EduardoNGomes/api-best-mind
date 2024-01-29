import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { FindAllProductService } from './FindAll'
import ProductFactory from '../../../test/factories/product'
import { Products } from '@prisma/client'
import { randomUUID } from 'node:crypto'

let sut: FindAllProductService
let inMemoryProductsRepository: InMemoryProductsRepository

const userId = randomUUID()

describe('Find All Products', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FindAllProductService(inMemoryProductsRepository)
    let product: Products

    for (let i = 0; i < 15; i++) {
      product = ProductFactory.createProductToUnitTest({
        id: `${i}`,
        user_Id: userId,
      })

      inMemoryProductsRepository.items.push(product)
    }
  })

  it('should find 10 product', async () => {
    const result = await sut.execute({ userId })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.products).toHaveLength(10)
  })

  it('should find 5 product', async () => {
    const result = await sut.execute({ userId, p: 2 })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.products).toHaveLength(5)
  })

  it('shouldnt find exists product from another user', async () => {
    const result = await sut.execute({ userId: '' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.products).toHaveLength(0)
  })
})
