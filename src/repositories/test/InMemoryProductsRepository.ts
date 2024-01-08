import { Products } from '@prisma/client'
import {
  ProductRepository,
  ProductToCreateProps,
  ProductToUpdateProps,
} from '../ProductRepository'
import { randomUUID } from 'crypto'

export class InMemoryProductsRepository implements ProductRepository {
  items: Products[] = []

  async create(data: ProductToCreateProps): Promise<void> {
    const id = randomUUID()
    const createdAt = new Date()
    const updatedAt = new Date()

    this.items.push({ id, ...data, createdAt, updatedAt })
  }

  async update(data: ProductToUpdateProps): Promise<void> {
    const productIndex = this.items.findIndex((item) => item.id === data.id)
    const updatedAt = new Date()

    const newProduct: Products = {
      id: this.items[productIndex].id,
      name: data.name ?? this.items[productIndex].name,
      createdAt: this.items[productIndex].createdAt,
      description: data.description ?? this.items[productIndex].description,
      price: data.price ?? this.items[productIndex].price,
      updatedAt,
    }

    this.items[productIndex] = newProduct
  }

  async findAll(): Promise<[] | Products[]> {
    return this.items
  }

  async findById(id: string): Promise<Products | null> {
    const product = this.items.find((product) => product.id === id)

    if (!product) return null

    return product
  }

  async findByName(name: string): Promise<Products | null> {
    const product = this.items.find((product) => product.name === name)

    if (!product) return null

    return product
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((product) => product.id !== id)
  }
}
