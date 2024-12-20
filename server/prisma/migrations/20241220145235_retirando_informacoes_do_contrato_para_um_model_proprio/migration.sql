/*
  Warnings:

  - You are about to drop the column `cofins` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `csll` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `emissionDate` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `finalDate` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `inss` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `irrf` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `issqn` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `pis` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `receiptNumber` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `contract` table. All the data in the column will be lost.
  - You are about to drop the column `contractId` on the `receiptNotes` table. All the data in the column will be lost.
  - Added the required column `contractInfoId` to the `receiptNotes` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "contractInfo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "receiptNumber" INTEGER NOT NULL,
    "emissionDate" DATETIME NOT NULL,
    "finalDate" DATETIME NOT NULL,
    "value" DECIMAL NOT NULL,
    "issqn" DECIMAL,
    "irrf" DECIMAL,
    "csll" DECIMAL,
    "cofins" DECIMAL,
    "inss" DECIMAL,
    "pis" DECIMAL,
    "calculatedWithholding" DECIMAL,
    "contractId" TEXT NOT NULL,
    CONSTRAINT "contractInfo_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "withholding" DECIMAL NOT NULL,
    "companyCnpj" TEXT NOT NULL,
    CONSTRAINT "contract_companyCnpj_fkey" FOREIGN KEY ("companyCnpj") REFERENCES "company" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("code", "companyCnpj", "id", "title", "withholding") SELECT "code", "companyCnpj", "id", "title", "withholding" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
CREATE TABLE "new_receiptNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "contractInfoId" TEXT NOT NULL,
    CONSTRAINT "receiptNotes_contractInfoId_fkey" FOREIGN KEY ("contractInfoId") REFERENCES "contractInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_receiptNotes" ("file", "id", "name") SELECT "file", "id", "name" FROM "receiptNotes";
DROP TABLE "receiptNotes";
ALTER TABLE "new_receiptNotes" RENAME TO "receiptNotes";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
