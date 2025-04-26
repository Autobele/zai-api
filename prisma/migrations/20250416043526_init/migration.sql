-- CreateEnum
CREATE TYPE "TenantStatus" AS ENUM ('ENABLE', 'DISABLE');

-- CreateTable
CREATE TABLE "Tentant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "TenantStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tentant_id_key" ON "Tentant"("id");
