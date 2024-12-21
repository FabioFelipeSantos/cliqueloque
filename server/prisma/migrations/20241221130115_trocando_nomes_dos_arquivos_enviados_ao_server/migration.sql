/*
  Warnings:

  - You are about to drop the column `file` on the `receiptNotes` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `receiptNotes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `contract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileName` to the `receiptNotes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `savedFileName` to the `receiptNotes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receiptNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "savedFileName" TEXT NOT NULL,
    "contractInfoId" TEXT NOT NULL,
    CONSTRAINT "receiptNotes_contractInfoId_fkey" FOREIGN KEY ("contractInfoId") REFERENCES "contractInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receiptNotes" ("contractInfoId", "id") SELECT "contractInfoId", "id" FROM "receiptNotes";
DROP TABLE "receiptNotes";
ALTER TABLE "new_receiptNotes" RENAME TO "receiptNotes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "contract_title_key" ON "contract"("title");
