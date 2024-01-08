import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import ProductFactory from '../../../test/factories/product'
import { Products } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EditProductService } from './Edit'

let sut: EditProductService
let inMemoryProductsRepository: InMemoryProductsRepository
let product: Products

const id = randomUUID()

describe('Edit Product', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()

    sut = new EditProductService(inMemoryProductsRepository)

    product = ProductFactory.createProductToUnitTest({ id })

    inMemoryProductsRepository.items.push(product)
  })

  it('should edit product', async () => {
    const result = await sut.execute({ id, name: '' })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items).toHaveLength(1)
    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      id,
      name: '',
      description: product.description,
      price: product.price,
    })
  })
  it('shouldnt edit product if id was wrong', async () => {
    const result = await sut.execute({ id: 'error test id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
