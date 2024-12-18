-- CreateTable
CREATE TABLE "company" (
    "cnpj" TEXT NOT NULL PRIMARY KEY,
    "socialName" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "externalSupplier" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "withholding" DECIMAL NOT NULL
);

-- CreateTable
CREATE TABLE "contract" (
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
    "pis" DECIMAL
);

-- CreateTable
CREATE TABLE "supplierContractPivot" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "feeNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "file" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "company_socialName_key" ON "company"("socialName");

-- CreateIndex
CREATE UNIQUE INDEX "contract_receiptNumber_key" ON "contract"("receiptNumber");
