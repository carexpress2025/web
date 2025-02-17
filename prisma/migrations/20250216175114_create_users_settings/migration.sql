-- CreateTable
CREATE TABLE "users_settings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "settingsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_settings_public_id_key" ON "users_settings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_settings_userId_key" ON "users_settings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_settings_settingsId_key" ON "users_settings"("settingsId");

-- AddForeignKey
ALTER TABLE "users_settings" ADD CONSTRAINT "users_settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_settings" ADD CONSTRAINT "users_settings_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
