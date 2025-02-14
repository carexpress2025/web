/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `users_subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_subscriptions_userId_key" ON "users_subscriptions"("userId");
