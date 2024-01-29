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
    await this.prisma.products.update({
      data: { ...data, updatedAt: new Date() },
      where: { id: data.id },
    })
  }

  async findAll(userId: string): Promise<[] | Products[]> {
    const allProducts = await this.prisma.products.findMany({
      where: { user_Id: userId },
      orderBy: { updatedAt: 'desc' },
    })

    return allProducts
  }

  async findById(id: string): Promise<Products | null> {
    const product = await this.prisma.products.findUnique({ where: { id } })

    return product
  }

  async findByName(name: string, userId: string): Promise<Products | null> {
    const product = await this.prisma.products.findUnique({
      where: { name_user_Id: { name, user_Id: userId } },
    })

    return product
  }

  async delete(id: string): Promise<void> {
    await this.prisma.products.delete({ where: { id } })
  }
}
