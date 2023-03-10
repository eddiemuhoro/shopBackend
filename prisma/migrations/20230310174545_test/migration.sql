-- CreateTable
CREATE TABLE "number" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "number_pkey" PRIMARY KEY ("id")
);
