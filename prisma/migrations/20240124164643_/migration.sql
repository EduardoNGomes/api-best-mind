/*
  Warnings:

  - A unique constraint covering the columns `[name,user_Id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "products_name_user_Id_key" ON "products"("name", "user_Id");
