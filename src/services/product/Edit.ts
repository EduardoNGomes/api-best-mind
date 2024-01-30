import { Either, left, right } from '@/erros/either'
import { ProductRepository } from '@/repositories/ProductRepository'
import { ResourceNotFoundError } from '../erros/ResourceNotFoundError'
import { Uploader } from '@/storage/uploader'
import { ImageCannotBeSavedError } from '../erros/ImageCannotBeSavedError'

type EditProductRequest = {
  id: string
  name?: string
  description?: string
  price?: number
  image?: string
}

type EditProductResponse = Either<
  ResourceNotFoundError | ImageCannotBeSavedError,
  object
>

export class EditProductService {
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
  }: EditProductRequest): Promise<EditProductResponse> {
    const product = await this.productRepository.findById(id)

    if (!product) return left(new ResourceNotFoundError())

    let imageUpdated

    if (image) {
      await this.uploader.delete(product.image)
      imageUpdated = await this.uploader.save(image)
      if (!imageUpdated) return left(new ImageCannotBeSavedError())
    }

    await this.productRepository.update({
      id,
      name: name?.toLowerCase(),
      description,
      price,
      image: imageUpdated,
    })

    return right({})
  }
}
