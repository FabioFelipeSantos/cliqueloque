/*
  Warnings:

  - Added the required column `filePath` to the `receiptNotes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_receiptNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "savedFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "contractInfoId" TEXT NOT NULL,
    CONSTRAINT "receiptNotes_contractInfoId_fkey" FOREIGN KEY ("contractInfoId") REFERENCES "contractInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receiptNotes" ("contractInfoId", "fileName", "id", "savedFileName") SELECT "contractInfoId", "fileName", "id", "savedFileName" FROM "receiptNotes";
DROP TABLE "receiptNotes";
ALTER TABLE "new_receiptNotes" RENAME TO "receiptNotes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
