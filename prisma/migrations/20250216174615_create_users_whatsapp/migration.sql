-- CreateTable
CREATE TABLE "users_whatsapp" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "noReplyList" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "userId" INTEGER NOT NULL,
    "whatsappId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_whatsapp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsapp_public_id_key" ON "users_whatsapp"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsapp_userId_key" ON "users_whatsapp"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_whatsapp_whatsappId_key" ON "users_whatsapp"("whatsappId");

-- AddForeignKey
ALTER TABLE "users_whatsapp" ADD CONSTRAINT "users_whatsapp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_whatsapp" ADD CONSTRAINT "users_whatsapp_whatsappId_fkey" FOREIGN KEY ("whatsappId") REFERENCES "whatsapp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
