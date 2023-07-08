-- CreateEnum
CREATE TYPE "CategoryProvider" AS ENUM ('FLUTTERWAVE', 'PAYSCRIBE', 'INNOVATE');

-- CreateEnum
CREATE TYPE "CategoryName" AS ENUM ('POWER', 'DATA', 'INTERNET', 'AIRTIME', 'CABLE');

-- CreateTable
CREATE TABLE "UtilityCategory" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "categoryName" "CategoryName" NOT NULL,
    "provider" "CategoryProvider" NOT NULL DEFAULT 'FLUTTERWAVE',

    CONSTRAINT "UtilityCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UtilityProduct" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "billerName" TEXT NOT NULL,
    "billerCode" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL,
    "fee" DECIMAL(65,30) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "labelName" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "UtilityProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UtilityCategory_categoryName_provider_key" ON "UtilityCategory"("categoryName", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "UtilityProduct_billerCode_billerName_key" ON "UtilityProduct"("billerCode", "billerName");

-- AddForeignKey
ALTER TABLE "UtilityProduct" ADD CONSTRAINT "UtilityProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "UtilityCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
