-- CreateEnum
CREATE TYPE "SENT_AUTOMATIC_MESSAGE" AS ENUM ('SENT', 'NOT_SENT', 'ERROR', 'ANSWERED');

-- CreateTable
CREATE TABLE "sent_automatic_messages" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "usedAi" BOOLEAN NOT NULL DEFAULT false,
    "status" "SENT_AUTOMATIC_MESSAGE" NOT NULL DEFAULT 'SENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sent_automatic_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_sent_automatic_messages" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "sentAutomaticMessageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_sent_automatic_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_sent_automatic_messages" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "carId" INTEGER NOT NULL,
    "sentAutomaticMessageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_sent_automatic_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sent_automatic_messages_public_id_key" ON "sent_automatic_messages"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_sent_automatic_messages_public_id_key" ON "users_sent_automatic_messages"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_sent_automatic_messages_sentAutomaticMessageId_key" ON "users_sent_automatic_messages"("sentAutomaticMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "cars_sent_automatic_messages_public_id_key" ON "cars_sent_automatic_messages"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_sent_automatic_messages_sentAutomaticMessageId_key" ON "cars_sent_automatic_messages"("sentAutomaticMessageId");

-- AddForeignKey
ALTER TABLE "users_sent_automatic_messages" ADD CONSTRAINT "users_sent_automatic_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_sent_automatic_messages" ADD CONSTRAINT "users_sent_automatic_messages_sentAutomaticMessageId_fkey" FOREIGN KEY ("sentAutomaticMessageId") REFERENCES "sent_automatic_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_sent_automatic_messages" ADD CONSTRAINT "cars_sent_automatic_messages_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_sent_automatic_messages" ADD CONSTRAINT "cars_sent_automatic_messages_sentAutomaticMessageId_fkey" FOREIGN KEY ("sentAutomaticMessageId") REFERENCES "sent_automatic_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
