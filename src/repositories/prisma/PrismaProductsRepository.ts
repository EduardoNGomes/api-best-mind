import { PrismaClient, Products } from '@prisma/client'
import {
  ProductRepository,
  ProductToCreateProps,
  ProductToUpdateProps,
} from '../ProductRepository'

export class PrismaProductsRepository implements ProductRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: ProductToCreateProps): Promise<void> {
    await this.prisma.products.create({ data })
  }

  async update(data: ProductToUpdateProps): Promise<void> {
    await this.prisma.products.update({ data, where: { id: data.id } })
  }

  async findAll(): Promise<[] | Products[]> {
    const allProducts = await this.prisma.products.findMany()

    return allProducts
  }

  async findById(id: string): Promise<Products | null> {
    const product = await this.prisma.products.findUnique({ where: { id } })

    return product
  }

  async findByName(name: string): Promise<Products | null> {
    const product = await this.prisma.products.findUnique({ where: { name } })

    return product
  }

  async delete(id: string): Promise<void> {
    await this.prisma.products.delete({ where: { id } })
  }
}
