-- CreateTable
CREATE TABLE "prompts" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "settingsReply" JSONB,
    "settingsSend" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prompts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_prompts" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "promptId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_prompts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prompts_public_id_key" ON "prompts"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_prompts_public_id_key" ON "users_prompts"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_prompts_userId_key" ON "users_prompts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_prompts_promptId_key" ON "users_prompts"("promptId");

-- AddForeignKey
ALTER TABLE "users_prompts" ADD CONSTRAINT "users_prompts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_prompts" ADD CONSTRAINT "users_prompts_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "prompts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
