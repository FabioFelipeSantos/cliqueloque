/*
  Warnings:

  - Added the required column `registerNumber` to the `contractInfo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contractInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiptNumber" INTEGER NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "issqn" REAL,
    "irrf" REAL,
    "csll" REAL,
    "cofins" REAL,
    "inss" REAL,
    "pis" REAL,
    "calculatedWithholding" REAL,
    "registerNumber" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    CONSTRAINT "contractInfo_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contractInfo" ("calculatedWithholding", "cofins", "contractId", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "value") SELECT "calculatedWithholding", "cofins", "contractId", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "value" FROM "contractInfo";
DROP TABLE "contractInfo";
ALTER TABLE "new_contractInfo" RENAME TO "contractInfo";
CREATE UNIQUE INDEX "contractInfo_registerNumber_key" ON "contractInfo"("registerNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
