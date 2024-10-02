/*
  Warnings:

  - Added the required column `ownerId` to the `Catalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Catalog" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Catalog" ADD CONSTRAINT "Catalog_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
