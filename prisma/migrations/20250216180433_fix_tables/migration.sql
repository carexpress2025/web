/*
  Warnings:

  - You are about to drop the column `carFavoriteId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the column `carUserSchedulingId` on the `cars` table. All the data in the column will be lost.
  - You are about to drop the `users_cars_favorities` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userFavoriteId]` on the table `cars_favorities` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sentManualMessageId]` on the table `users_sent_manual_messages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userFavoriteId` to the `cars_favorities` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_carFavoriteId_fkey";

-- DropForeignKey
ALTER TABLE "cars" DROP CONSTRAINT "cars_carUserSchedulingId_fkey";

-- DropForeignKey
ALTER TABLE "users_cars_favorities" DROP CONSTRAINT "users_cars_favorities_carFavoriteId_fkey";

-- DropForeignKey
ALTER TABLE "users_cars_favorities" DROP CONSTRAINT "users_cars_favorities_userId_fkey";

-- AlterTable
ALTER TABLE "cars" DROP COLUMN "carFavoriteId",
DROP COLUMN "carUserSchedulingId";

-- AlterTable
ALTER TABLE "cars_favorities" ADD COLUMN     "userFavoriteId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "users_cars_favorities";

-- CreateTable
CREATE TABLE "users_favorities" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "favoriteId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_favorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CarToCarFavorite" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CarToCarFavorite_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CarToCarUserScheduling" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CarToCarUserScheduling_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_favorities_public_id_key" ON "users_favorities"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_favorities_userId_key" ON "users_favorities"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_favorities_favoriteId_key" ON "users_favorities"("favoriteId");

-- CreateIndex
CREATE INDEX "_CarToCarFavorite_B_index" ON "_CarToCarFavorite"("B");

-- CreateIndex
CREATE INDEX "_CarToCarUserScheduling_B_index" ON "_CarToCarUserScheduling"("B");

-- CreateIndex
CREATE UNIQUE INDEX "cars_favorities_userFavoriteId_key" ON "cars_favorities"("userFavoriteId");

-- CreateIndex
CREATE UNIQUE INDEX "users_sent_manual_messages_sentManualMessageId_key" ON "users_sent_manual_messages"("sentManualMessageId");

-- AddForeignKey
ALTER TABLE "users_favorities" ADD CONSTRAINT "users_favorities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorities" ADD CONSTRAINT "users_favorities_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "favorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_favorities" ADD CONSTRAINT "cars_favorities_userFavoriteId_fkey" FOREIGN KEY ("userFavoriteId") REFERENCES "users_favorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToCarFavorite" ADD CONSTRAINT "_CarToCarFavorite_A_fkey" FOREIGN KEY ("A") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToCarFavorite" ADD CONSTRAINT "_CarToCarFavorite_B_fkey" FOREIGN KEY ("B") REFERENCES "cars_favorities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToCarUserScheduling" ADD CONSTRAINT "_CarToCarUserScheduling_A_fkey" FOREIGN KEY ("A") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToCarUserScheduling" ADD CONSTRAINT "_CarToCarUserScheduling_B_fkey" FOREIGN KEY ("B") REFERENCES "cars_users_schedulings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
