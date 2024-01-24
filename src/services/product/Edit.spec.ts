import { InMemoryProductsRepository } from '@/repositories/test/InMemoryProductsRepository'
import ProductFactory from '../../../test/factories/product'
import { Products } from '@prisma/client'
import { randomUUID } from 'crypto'
import { EditProductService } from './Edit'
import { UploaderTest } from '@/storage/test/UploaderTest'

let sut: EditProductService
let inMemoryProductsRepository: InMemoryProductsRepository
let product: Products
let uploaderTest: UploaderTest

const id = randomUUID()

describe('Edit Product', () => {
  beforeAll(() => {
    inMemoryProductsRepository = new InMemoryProductsRepository()
    uploaderTest = new UploaderTest()

    sut = new EditProductService(inMemoryProductsRepository, uploaderTest)

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
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: expect.any(Date),
      user_Id: product.user_Id,
    })
  })

  it('should only update product image', async () => {
    const result = await sut.execute({ id, image: 'image-update' })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryProductsRepository.items[0]).toMatchObject({
      id,
      name: '',
      description: product.description,
      price: product.price,
      image: 'image-update',
      createdAt: product.createdAt,
      updatedAt: expect.any(Date),
      user_Id: product.user_Id,
    })
    expect(uploaderTest.items).toHaveLength(1)
    expect(uploaderTest.items[0]).toEqual('image-update')
  })
  it('shouldnt edit product if id was wrong', async () => {
    const result = await sut.execute({ id: 'error test id' })

    expect(result.isLeft()).toBeTruthy()
  })
})
