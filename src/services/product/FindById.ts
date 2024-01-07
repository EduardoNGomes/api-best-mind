import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { Products } from '@prisma/client'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'

type FindProductByIdRequest = {
  id: string
}

type FindProductByIdResponse = Either<
  ResourceNotFoundError,
  { products: Products }
>

export class FindProductByIdService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
  }: FindProductByIdRequest): Promise<FindProductByIdResponse> {
    const products = await this.productRepository.findById(id)

    if (!products) return left(new ResourceNotFoundError())

    return right({ products })
  }
}
