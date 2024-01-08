import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceAlreadyExistError } from '../erros/ResourceAlreadyExistError'

type CreateProductRequest = {
  name: string
  description: string
  price: number
}

type CreateProductResponse = Either<ResourceAlreadyExistError, object>

export class CreateProductService {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productExist = await this.productRepository.findByName(name)

    if (productExist) return left(new ResourceAlreadyExistError())

    await this.productRepository.create({ name, description, price })

    return right({})
  }
}
