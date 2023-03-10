/*
  Warnings:

  - You are about to drop the `number` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `price` on the `cart` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `price` on the `wishlist` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "wishlist" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "number";
