import { Prisma, Products } from "@prisma/client";

type Product = Prisma.ProductsUncheckedCreateInput

export abstract class ProductRepository{
  abstract create(data:Product):Promise<void>
  abstract update(data:Product):Promise<void>
  abstract findAll():Promise<Products[]| []>
  abstract findById(id:string):Promise<Products| null>
  abstract delete(id:string):Promise<void>
}