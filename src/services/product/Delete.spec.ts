import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { DeleteProductService } from './Delete'
import { Products } from '@prisma/client'
import ProductFactory from '../../../test/factories/product'
import { randomUUID } from 'crypto'

let sut: DeleteProductService
let inMemoryProductsRepository: InMemoryProductsRepository
let product: Products

const id = randomUUID()

describe('Delete Product by id', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new DeleteProductService(inMemoryProductsRepository)

    product = ProductFactory.createProductToUnitTest({ id })

    inMemoryProductsRepository.items.push(product)
  })

  it('should delete a product', async () => {
    expect(inMemoryProductsRepository.items).toHaveLength(1)

    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(0)
  })
  it('shouldnt delete a product if id was wrong', async () => {
    const result = await sut.execute({ id })

    expect(result.isLeft()).toBeTruthy()
  })
})
