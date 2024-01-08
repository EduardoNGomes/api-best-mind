import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { FindAllProductService } from './FindAll'

let sut: FindAllProductService
let inMemoryProductsRepository: InMemoryProductsRepository

describe('Find All Products', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FindAllProductService(inMemoryProductsRepository)

    for (let i = 0; i < 10; i++) {
      inMemoryProductsRepository.items.push({
        id: `${i}`,
        name: `New Product-${i}`,
        description: 'New Product description',
        price: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  })

  it('should find all exists product', async () => {
    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(10)
  })
})
