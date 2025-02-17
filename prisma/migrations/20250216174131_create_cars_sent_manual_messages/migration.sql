/*
  Warnings:

  - A unique constraint covering the columns `[public_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `public_id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "public_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "cars_sent_manual_messages" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,
    "sentManualMessageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_sent_manual_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_sent_manual_messages_public_id_key" ON "cars_sent_manual_messages"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_sent_manual_messages_sentManualMessageId_key" ON "cars_sent_manual_messages"("sentManualMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- AddForeignKey
ALTER TABLE "cars_sent_manual_messages" ADD CONSTRAINT "cars_sent_manual_messages_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_sent_manual_messages" ADD CONSTRAINT "cars_sent_manual_messages_sentManualMessageId_fkey" FOREIGN KEY ("sentManualMessageId") REFERENCES "sent_manual_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
