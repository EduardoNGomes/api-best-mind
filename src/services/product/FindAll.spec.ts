import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { FindAllProductService } from './FindAll'
import ProductFactory from '../../../test/factories/product'
import { Products } from '@prisma/client'

let sut: FindAllProductService
let inMemoryProductsRepository: InMemoryProductsRepository

describe('Find All Products', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FindAllProductService(inMemoryProductsRepository)
    let product: Products

    for (let i = 0; i < 10; i++) {
      product = ProductFactory.createProductToUniteTest({ id: `${i}` })

      inMemoryProductsRepository.items.push(product)
    }
  })

  it('should find all exists product', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(10)
  })
})
