-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "type" TEXT,
    "author" TEXT,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);
