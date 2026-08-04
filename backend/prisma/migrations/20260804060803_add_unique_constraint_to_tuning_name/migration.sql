/*
  Warnings:

  - You are about to drop the column `lasPracticed` on the `Song` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Tuning` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "lasPracticed",
ADD COLUMN     "lastPracticed" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Tuning_name_key" ON "Tuning"("name");
