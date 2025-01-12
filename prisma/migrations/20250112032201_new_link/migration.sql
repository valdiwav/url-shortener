/*
  Warnings:

  - You are about to drop the column `password` on the `Link` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[newLink]` on the table `Link` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `newLink` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Link" DROP COLUMN "password",
ADD COLUMN     "newLink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_newLink_key" ON "Link"("newLink");
