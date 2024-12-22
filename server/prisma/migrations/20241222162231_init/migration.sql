-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnpj" TEXT NOT NULL,
    "socialName" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "withholding" REAL NOT NULL,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "contractInfo" (
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

-- CreateTable
CREATE TABLE "receiptNotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileName" TEXT NOT NULL,
    "savedFileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "contractInfoId" TEXT NOT NULL,
    CONSTRAINT "receiptNotes_contractInfoId_fkey" FOREIGN KEY ("contractInfoId") REFERENCES "contractInfo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "company_cnpj_key" ON "company"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "company_socialName_key" ON "company"("socialName");

-- CreateIndex
CREATE UNIQUE INDEX "contract_title_key" ON "contract"("title");
