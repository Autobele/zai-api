-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile" SET DEFAULT 'MEMBER';

-- CreateTable
CREATE TABLE "WhatsApp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "WhatsApp_id_key" ON "WhatsApp"("id");

-- AddForeignKey
ALTER TABLE "WhatsApp" ADD CONSTRAINT "WhatsApp_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Tentant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
