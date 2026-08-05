/*
  Warnings:

  - A unique constraint covering the columns `[brand,model]` on the table `Guitar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Guitar_brand_model_key" ON "Guitar"("brand", "model");
