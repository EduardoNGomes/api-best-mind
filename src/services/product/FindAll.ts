import { Either, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { Products } from '@prisma/client'

type FindAllProductRequest = {
  userId: string
}

type FindAllProductResponse = Either<null, { products: Products[] }>

export class FindAllProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    userId,
  }: FindAllProductRequest): Promise<FindAllProductResponse> {
    const products = await this.productRepository.findAll(userId)

    return right({ products })
  }
}
