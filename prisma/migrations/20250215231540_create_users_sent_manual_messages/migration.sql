-- CreateTable
CREATE TABLE "users_sent_manual_messages" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "sentManualMessageId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_sent_manual_messages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_sent_manual_messages_public_id_key" ON "users_sent_manual_messages"("public_id");

-- AddForeignKey
ALTER TABLE "users_sent_manual_messages" ADD CONSTRAINT "users_sent_manual_messages_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_sent_manual_messages" ADD CONSTRAINT "users_sent_manual_messages_sentManualMessageId_fkey" FOREIGN KEY ("sentManualMessageId") REFERENCES "sent_manual_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
