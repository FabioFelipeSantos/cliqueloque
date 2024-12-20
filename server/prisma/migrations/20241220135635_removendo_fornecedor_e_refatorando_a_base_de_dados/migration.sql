/*
  Warnings:

  - You are about to drop the `externalSupplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `externalSupplierId` on the `contract` table. All the data in the column will be lost.
  - Added the required column `companyCnpj` to the `contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "externalSupplier_code_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "externalSupplier";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
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
INSERT INTO "new_contract" ("cofins", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value") SELECT "cofins", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
CREATE UNIQUE INDEX "contract_receiptNumber_key" ON "contract"("receiptNumber");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
