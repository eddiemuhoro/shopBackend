/*
  Warnings:

  - You are about to drop the `bid` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_belongToEmployee_fkey";

-- DropForeignKey
ALTER TABLE "bid" DROP CONSTRAINT "bid_belongToJob_fkey";

-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_employerId_fkey";

-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_favoritedBy_fkey";

-- DropForeignKey
ALTER TABLE "message" DROP CONSTRAINT "message_bid_fkey";

-- DropTable
DROP TABLE "bid";

-- DropTable
DROP TABLE "job";

-- DropTable
DROP TABLE "message";
