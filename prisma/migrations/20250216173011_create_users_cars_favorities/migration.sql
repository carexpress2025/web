-- AlterTable
ALTER TABLE "cars" ADD COLUMN     "carFavoriteId" INTEGER;

-- CreateTable
CREATE TABLE "favorities" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "favorities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_cars_favorities" (
    "id" SERIAL NOT NULL,
    "public_id" TEXT NOT NULL,
    "carFavoriteId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_cars_favorities_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "favorities_public_id_key" ON "favorities"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_cars_favorities_public_id_key" ON "users_cars_favorities"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_cars_favorities_carFavoriteId_key" ON "users_cars_favorities"("carFavoriteId");

-- CreateIndex
CREATE UNIQUE INDEX "users_cars_favorities_userId_key" ON "users_cars_favorities"("userId");

-- AddForeignKey
ALTER TABLE "users_cars_favorities" ADD CONSTRAINT "users_cars_favorities_carFavoriteId_fkey" FOREIGN KEY ("carFavoriteId") REFERENCES "cars_favorities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_cars_favorities" ADD CONSTRAINT "users_cars_favorities_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cars" ADD CONSTRAINT "cars_carFavoriteId_fkey" FOREIGN KEY ("carFavoriteId") REFERENCES "cars_favorities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
