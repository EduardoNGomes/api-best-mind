import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'

type DeleteProductRequest = {
  id: string
}

type DeleteProductResponse = Either<ResourceNotFoundError, object>

export class DeleteProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const productsExist = await this.productRepository.findById(id)

    if (!productsExist) return left(new ResourceNotFoundError())

    await this.productRepository.delete(id)

    return right({})
  }
}
