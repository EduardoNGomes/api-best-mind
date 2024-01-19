import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceAlreadyExistError } from '../erros/ResourceAlreadyExistError'
import { Uploader } from '@/storage/uploader'

type CreateProductRequest = {
  name: string
  description: string
  price: number
  image: string
}

type CreateProductResponse = Either<ResourceAlreadyExistError, object>

export class CreateProductService {
  constructor(
    private productRepository: ProductRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    name,
    description,
    price,
    image,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productExist = await this.productRepository.findByName(name)

    if (productExist) return left(new ResourceAlreadyExistError())

    const imageSaved = await this.uploader.save(image)

    await this.productRepository.create({
      name,
      description,
      price,
      image: imageSaved,
    })

    return right({})
  }
}
