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

    for (let i = 0; i < 10; i++) {
      product = ProductFactory.createProductToUnitTest({
        id: `${i}`,
        user_Id: userId,
      })

      inMemoryProductsRepository.items.push(product)
    }
  })

  it('should find all exists product', async () => {
    const result = await sut.execute({ userId })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.products).toHaveLength(10)
  })

  it('shouldnt find exists product from another user', async () => {
    const result = await sut.execute({ userId: '' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.products).toHaveLength(0)
  })
})
