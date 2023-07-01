/*
  Warnings:

  - Added the required column `key` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Hash` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HashStatus" AS ENUM ('pending', 'completed', 'failed');

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hash" ADD COLUMN     "status" "HashStatus" NOT NULL;
