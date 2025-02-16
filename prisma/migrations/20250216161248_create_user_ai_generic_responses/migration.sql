-- CreateTable
CREATE TABLE "users_ai_generic_responses" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "aiGenericResponseId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_ai_generic_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_ai_generic_responses_public_id_key" ON "users_ai_generic_responses"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_ai_generic_responses_userId_key" ON "users_ai_generic_responses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_ai_generic_responses_aiGenericResponseId_key" ON "users_ai_generic_responses"("aiGenericResponseId");

-- AddForeignKey
ALTER TABLE "users_ai_generic_responses" ADD CONSTRAINT "users_ai_generic_responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_ai_generic_responses" ADD CONSTRAINT "users_ai_generic_responses_aiGenericResponseId_fkey" FOREIGN KEY ("aiGenericResponseId") REFERENCES "ai_generic_responses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
