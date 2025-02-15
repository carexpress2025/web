/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `schedulings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `subscriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `users_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `users_schedulings` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[public_id]` on the table `users_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `cars` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `schedulings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `subscriptions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `users_accounts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `users_schedulings` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `public_id` was added to the `users_subscriptions` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "schedulings" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subscriptions" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_accounts" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_schedulings" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users_subscriptions" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_public_id_key" ON "accounts"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_public_id_key" ON "cars"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedulings_public_id_key" ON "schedulings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "subscriptions_public_id_key" ON "subscriptions"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_accounts_public_id_key" ON "users_accounts"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_schedulings_public_id_key" ON "users_schedulings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptions_public_id_key" ON "users_subscriptions"("public_id");
