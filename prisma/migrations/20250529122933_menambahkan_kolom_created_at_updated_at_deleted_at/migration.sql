/*
  Warnings:

  - Added the required column `crated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "crated_at" INTEGER NOT NULL,
ADD COLUMN     "deleted_at" INTEGER,
ADD COLUMN     "updated_at" INTEGER;
