import { Either, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { Products } from '@prisma/client'

type FindAllProductRequest = {
  userId: string
  p?: number
}

type FindAllProductResponse = Either<null, { products: Products[] }>

export class FindAllProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    userId,
    p = 1,
  }: FindAllProductRequest): Promise<FindAllProductResponse> {
    const products = await this.productRepository.findAll({ userId, p })

    return right({ products })
  }
}
