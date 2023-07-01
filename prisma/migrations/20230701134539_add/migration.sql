-- AlterTable
ALTER TABLE "Hash" ALTER COLUMN "hash" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'pending';
