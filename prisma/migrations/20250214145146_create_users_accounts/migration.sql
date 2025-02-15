-- CreateTable
CREATE TABLE "users_accounts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "accountId" INTEGER,

    CONSTRAINT "users_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_accounts_userId_key" ON "users_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_accounts_accountId_key" ON "users_accounts"("accountId");

-- AddForeignKey
ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_accounts" ADD CONSTRAINT "users_accounts_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
