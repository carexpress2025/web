-- CreateTable
CREATE TABLE "ai_generic_responses" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "positiveResponses" TEXT[],
    "negativeResponses" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_generic_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ai_generic_responses_public_id_key" ON "ai_generic_responses"("public_id");
