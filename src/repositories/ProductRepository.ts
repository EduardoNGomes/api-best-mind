import { Prisma, Products } from '@prisma/client'

export type ProductToCreateProps = Prisma.ProductsUncheckedCreateInput

export type ProductToUpdateProps = {
  id: string
  name?: string
  description?: string
  price?: number
  image?: string
}

export abstract class ProductRepository {
  abstract create(data: ProductToCreateProps): Promise<void>
  abstract update(data: ProductToUpdateProps): Promise<void>
  abstract findAll(userId: string): Promise<Products[] | []>
  abstract findById(id: string): Promise<Products | null>
  abstract findByName(name: string, userId: string): Promise<Products | null>
  abstract delete(id: string): Promise<void>
}
