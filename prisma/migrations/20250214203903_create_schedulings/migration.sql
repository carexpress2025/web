-- CreateTable
CREATE TABLE "schedulings" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "filters" JSONB NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "schedulings_pkey" PRIMARY KEY ("id")
);
