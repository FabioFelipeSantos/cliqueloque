/*
  Warnings:

  - Added the required column `withholding` to the `contract` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "withholding" TEXT NOT NULL,
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
    "companyCnpj" TEXT NOT NULL,
    CONSTRAINT "contract_companyCnpj_fkey" FOREIGN KEY ("companyCnpj") REFERENCES "company" ("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("code", "cofins", "companyCnpj", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value") SELECT "code", "cofins", "companyCnpj", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
