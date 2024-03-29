import { ProductToCreateProps } from '@/repositories/ProductRepository'
import { randomUUID } from 'crypto'
import { faker } from '@faker-js/faker'
import { Products } from '@prisma/client'

class ProductFactory {
  createProductToUnitTest(data: Partial<ProductToCreateProps>) {
    const product: Products = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      description: data.description ?? faker.lorem.lines(1),
      price: data.price ?? faker.number.int(),
      image: data.image ?? faker.word.words(1),
      user_Id: data.user_Id ?? faker.word.words(1),
      createdAt: (data.createdAt as Date) ?? faker.date.anytime(),
      updatedAt: (data.updatedAt as Date) ?? faker.date.anytime(),
    }
    return product
  }

  async createProductToE2ETest(
    data: Partial<ProductToCreateProps>,
  ): Promise<Products> {
    const product = {
      id: data.id ?? randomUUID(),
      name: data.name ?? faker.word.words(1),
      description: data.description ?? faker.lorem.lines(1),
      price: data.price ?? faker.number.int({ min: 1, max: 100 }),
      image: data.image ?? faker.word.words(1),
      user_Id: data.user_Id ?? faker.word.words(1),
      createdAt: (data.createdAt as Date) ?? undefined,
      updatedAt: (data.updatedAt as Date) ?? undefined,
    }
    return product
  }
}

export default new ProductFactory()
