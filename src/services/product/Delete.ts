import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'
import { Uploader } from '@/storage/uploader'

type DeleteProductRequest = {
  id: string
}

type DeleteProductResponse = Either<ResourceNotFoundError, object>

export class DeleteProductService {
  constructor(
    private productRepository: ProductRepository,
    private uploader: Uploader,
  ) {}

  async execute({ id }: DeleteProductRequest): Promise<DeleteProductResponse> {
    const product = await this.productRepository.findById(id)

    if (!product) return left(new ResourceNotFoundError())

    await this.uploader.delete(product.image)
    await this.productRepository.delete(id)

    return right({})
  }
}
