import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { DeleteProductService } from './Delete'

let sut: DeleteProductService
let inMemoryProductsRepository: InMemoryProductsRepository

const id = 'test-id'

describe('Delete Product by id', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new DeleteProductService(inMemoryProductsRepository)

    inMemoryProductsRepository.items.push({
      id,
      name: 'New Product',
      description: 'New Product description',
      price: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })

  it('should delete a product', async () => {
    expect(inMemoryProductsRepository.items).toHaveLength(1)

    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(0)
  })
  it('shouldnt delete a product if id was wrong', async () => {
    const result = await sut.execute({ id: 'error id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
