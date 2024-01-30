import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceAlreadyExistError } from '../erros/ResourceAlreadyExistError'
import { Uploader } from '@/storage/uploader'
import { ImageCannotBeSavedError } from '../erros/ImageCannotBeSavedError'

type CreateProductRequest = {
  id: string
  name: string
  description: string
  price: number
  image: string
  userId: string
}

type CreateProductResponse = Either<
  ResourceAlreadyExistError | ImageCannotBeSavedError,
  object
>

export class CreateProductService {
  constructor(
    private productRepository: ProductRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    id,
    name,
    description,
    price,
    image,
    userId,
  }: CreateProductRequest): Promise<CreateProductResponse> {
    const productExist = await this.productRepository.findByName(name, userId)

    if (productExist) return left(new ResourceAlreadyExistError())

    const imageSaved = await this.uploader.save(image)

    if (!imageSaved) return left(new ImageCannotBeSavedError())

    await this.productRepository.create({
      id,
      name,
      description,
      price,
      image: imageSaved,
      user_Id: userId,
    })

    return right({})
  }
}
