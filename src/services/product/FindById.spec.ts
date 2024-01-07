import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { FindProductByIdService } from './FindById'

let sut: FindProductByIdService
let inMemoryProductsRepository: InMemoryProductsRepository

const id = 'test-id'

describe('Find Product by id', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FindProductByIdService(inMemoryProductsRepository)

    inMemoryProductsRepository.items.push({
      id,
      name: 'New Product',
      description: 'New Product description',
      price: '10',
    })
  })

  it('should find a unique product', async () => {
    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    if ('products' in result.value) {
      expect(result.value.products).toMatchObject({
        id,
        name: 'New Product',
        description: 'New Product description',
        price: '10',
      })
    }
  })
  it('shouldnt find a unique product if id was wrong', async () => {
    const result = await sut.execute({ id: 'error id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
