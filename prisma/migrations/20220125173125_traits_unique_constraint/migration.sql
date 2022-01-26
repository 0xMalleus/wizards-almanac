/*
  Warnings:

  - A unique constraint covering the columns `[type,value]` on the table `Traits` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Traits_value_key";

-- DropIndex
DROP INDEX "Traits_type_key";

-- CreateIndex
CREATE UNIQUE INDEX "Traits_type_value_key" ON "Traits"("type", "value");
