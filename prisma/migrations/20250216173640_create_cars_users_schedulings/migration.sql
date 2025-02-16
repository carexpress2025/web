-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "carUserSchedulingId" INTEGER;

-- CreateTable
CREATE TABLE "cars_users_schedulings" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "userSchedulingId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cars_users_schedulings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_users_schedulings_public_id_key" ON "cars_users_schedulings"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "cars_users_schedulings_userSchedulingId_key" ON "cars_users_schedulings"("userSchedulingId");

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_carUserSchedulingId_fkey" FOREIGN KEY ("carUserSchedulingId") REFERENCES "cars_users_schedulings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars_users_schedulings" ADD CONSTRAINT "cars_users_schedulings_userSchedulingId_fkey" FOREIGN KEY ("userSchedulingId") REFERENCES "users_schedulings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
