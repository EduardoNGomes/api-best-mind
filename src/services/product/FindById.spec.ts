import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import { FindProductByIdService } from './FindById'
import ProductFactory from '../../../test/factories/product'
import { Products } from '@prisma/client'
import { randomUUID } from 'crypto'

let sut: FindProductByIdService
let inMemoryProductsRepository: InMemoryProductsRepository
let product: Products

const id = randomUUID()

describe('Find Product by id', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new FindProductByIdService(inMemoryProductsRepository)

    product = ProductFactory.createProductToUniteTest({ id })

    inMemoryProductsRepository.items.push(product)
  })

  it('should find a unique product', async () => {
    const result = await sut.execute({ id })

    expect(result.isRight()).toBeTruthy()
    if ('products' in result.value) {
      expect(result.value.products).toMatchObject({
        id,
        name: product.name,
        description: product.description,
        price: product.price,
      })
    }
  })
  it('shouldnt find a unique product if id was wrong', async () => {
    const result = await sut.execute({ id: 'error test id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
