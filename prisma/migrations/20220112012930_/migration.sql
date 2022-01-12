/*
  Warnings:

  - You are about to drop the column `avarta` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "avarta",
ADD COLUMN     "avatar" TEXT;
