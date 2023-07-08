/*
  Warnings:

  - A unique constraint covering the columns `[billerCode,billerName,itemCode]` on the table `UtilityProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UtilityProduct_billerCode_billerName_key";

-- CreateIndex
CREATE UNIQUE INDEX "UtilityProduct_billerCode_billerName_itemCode_key" ON "UtilityProduct"("billerCode", "billerName", "itemCode");
