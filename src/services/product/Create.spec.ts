import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { CreateProductService } from './Create'

let sut: CreateProductService
let inMemoryProductsRepository: InMemoryProductsRepository

describe('Create Product', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new CreateProductService(inMemoryProductsRepository)
  })

  it('should create a new product', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'New Product description',
      price: '10',
    }

    const result = await sut.execute(newProduct)

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'New Product',
        description: 'New Product description',
        price: '10',
      }),
    )
  })
  it('shouldnt create a new product if the product already exist on database', async () => {
    const newProduct = {
      name: 'New Product',
      description: 'New Product description',
      price: '10',
    }

    await sut.execute(newProduct)
    const result = await sut.execute(newProduct)

    expect(result.isLeft()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(1)
  })
})
