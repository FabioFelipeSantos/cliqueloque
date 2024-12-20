/*
  Warnings:

  - You are about to drop the `feeNotes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplierContractPivot` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `company` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `externalSupplier` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `company` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `externalSupplierId` to the `contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `externalSupplier` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `externalSupplier` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "feeNotes";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "supplierContractPivot";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "receiptNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "contractId" TEXT NOT NULL,
    CONSTRAINT "receiptNotes_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "contract" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL
);
INSERT INTO "new_company" ("cnpj", "fantasyName", "socialName") SELECT "cnpj", "fantasyName", "socialName" FROM "company";
DROP TABLE "company";
ALTER TABLE "new_company" RENAME TO "company";
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");
CREATE UNIQUE INDEX "company_socialName_key" ON "company"("socialName");
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
    "externalSupplierId" TEXT NOT NULL,
    CONSTRAINT "contract_externalSupplierId_fkey" FOREIGN KEY ("externalSupplierId") REFERENCES "externalSupplier" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("cofins", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value") SELECT "cofins", "csll", "emissionDate", "finalDate", "id", "inss", "irrf", "issqn", "pis", "receiptNumber", "title", "value" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
CREATE UNIQUE INDEX "contract_receiptNumber_key" ON "contract"("receiptNumber");
CREATE TABLE "new_externalSupplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "withholding" DECIMAL NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "externalSupplier_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_externalSupplier" ("code", "name", "withholding") SELECT "code", "name", "withholding" FROM "externalSupplier";
DROP TABLE "externalSupplier";
ALTER TABLE "new_externalSupplier" RENAME TO "externalSupplier";
CREATE UNIQUE INDEX "externalSupplier_code_key" ON "externalSupplier"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
