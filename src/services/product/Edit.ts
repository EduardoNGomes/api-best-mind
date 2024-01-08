import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'

type EditProductRequest = {
  id: string
  name?: string
  description?: string
  price?: number
}

type EditProductResponse = Either<ResourceNotFoundError, object>

export class EditProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    description,
    price,
  }: EditProductRequest): Promise<EditProductResponse> {
    const products = await this.productRepository.findById(id)

    if (!products) return left(new ResourceNotFoundError())

    await this.productRepository.update({ id, name, description, price })

    return right({})
  }
}
