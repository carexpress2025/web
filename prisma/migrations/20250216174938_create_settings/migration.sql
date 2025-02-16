-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "sendMessagesWithIA" BOOLEAN NOT NULL DEFAULT false,
    "replyMessagesWithIA" BOOLEAN NOT NULL DEFAULT false,
    "replyWithGenericAnswers" BOOLEAN NOT NULL DEFAULT false,
    "modelIA" TEXT,
    "apiKeyIA" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "settings_public_id_key" ON "settings"("public_id");
