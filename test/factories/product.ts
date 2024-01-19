import { ProductToCreateProps } from '@/repositories/ProductRepository'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'

class ProductFactory {
  createProductToUnitTest(data: Partial<ProductToCreateProps>) {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      description: data.description ?? faker.lorem.lines(1),
      price: data.price ?? faker.number.int(),
      image: data.image ?? faker.word.words(1),
      createdAt: (data.createdAt as Date) ?? faker.date.anytime(),
      updatedAt: (data.updatedAt as Date) ?? faker.date.anytime(),
    }
    return product
  }
}

export default new ProductFactory()
