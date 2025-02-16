/*
  Warnings:

  - A unique constraint covering the columns `[idCar]` on the table `cars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `idCar` to the `cars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE cars_id_seq;
ALTER TABLE "cars" ADD COLUMN     "idCar" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('cars_id_seq');
ALTER SEQUENCE cars_id_seq OWNED BY "cars"."id";

-- CreateIndex
CREATE UNIQUE INDEX "cars_idCar_key" ON "cars"("idCar");
