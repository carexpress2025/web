-- CreateTable
CREATE TABLE "whatsapp" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "session" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "whatsapp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_public_id_key" ON "whatsapp"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "whatsapp_number_key" ON "whatsapp"("number");
