/*
  Warnings:

  - Added the required column `description` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `wishlist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
