/*
  Warnings:

  - You are about to alter the column `withholding` on the `contract` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `calculatedWithholding` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `cofins` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `csll` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `inss` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `irrf` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `issqn` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `pis` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to alter the column `value` on the `contractInfo` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "withholding" REAL NOT NULL,
    "companyCnpj" TEXT NOT NULL,
    CONSTRAINT "contract_companyCnpj_fkey" FOREIGN KEY ("companyCnpj") REFERENCES "company" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("code", "companyCnpj", "id", "title", "withholding") SELECT "code", "companyCnpj", "id", "title", "withholding" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
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
    "contractId" TEXT NOT NULL,
    CONSTRAINT "contractInfo_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contractInfo" ("calculatedWithholding", "cofins", "contractId", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "value") SELECT "calculatedWithholding", "cofins", "contractId", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "value" FROM "contractInfo";
DROP TABLE "contractInfo";
ALTER TABLE "new_contractInfo" RENAME TO "contractInfo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
