-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('none', 'google', 'facebook', 'github');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider"[] DEFAULT ARRAY[]::"Provider"[];
