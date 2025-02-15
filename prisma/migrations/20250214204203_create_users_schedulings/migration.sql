-- CreateTable
CREATE TABLE "users_schedulings" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "schedulingId" INTEGER NOT NULL,

    CONSTRAINT "users_schedulings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_schedulings_schedulingId_key" ON "users_schedulings"("schedulingId");

-- AddForeignKey
ALTER TABLE "users_schedulings" ADD CONSTRAINT "users_schedulings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_schedulings" ADD CONSTRAINT "users_schedulings_schedulingId_fkey" FOREIGN KEY ("schedulingId") REFERENCES "schedulings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
