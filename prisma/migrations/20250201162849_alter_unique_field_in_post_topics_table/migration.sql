/*
  Warnings:

  - A unique constraint covering the columns `[userId,slug]` on the table `postTopics` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,name]` on the table `postTopics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `postTopics` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "postTopics_name_key";

-- DropIndex
DROP INDEX "postTopics_slug_key";

-- AlterTable
ALTER TABLE "postTopics" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "postTopics_userId_slug_key" ON "postTopics"("userId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "postTopics_userId_name_key" ON "postTopics"("userId", "name");

-- AddForeignKey
ALTER TABLE "postTopics" ADD CONSTRAINT "postTopics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
