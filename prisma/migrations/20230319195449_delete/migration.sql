-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_productId_fkey";

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
