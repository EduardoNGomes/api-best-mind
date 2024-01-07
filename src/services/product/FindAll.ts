import { Either, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { Products } from '@prisma/client'

type FindAllProductResponse = Either<null, { products: Products[] }>

export class FindAllProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<FindAllProductResponse> {
    const products = await this.productRepository.findAll()

    return right({ products })
  }
}
