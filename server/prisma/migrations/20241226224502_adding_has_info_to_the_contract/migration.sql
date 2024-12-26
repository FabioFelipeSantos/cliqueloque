-- DropIndex
DROP INDEX "contractInfo_registerNumber_key";

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "withholding" REAL NOT NULL,
    "hasInfo" BOOLEAN NOT NULL DEFAULT false,
    "companyId" TEXT NOT NULL,
    CONSTRAINT "contract_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contract" ("code", "companyId", "id", "title", "withholding") SELECT "code", "companyId", "id", "title", "withholding" FROM "contract";
DROP TABLE "contract";
ALTER TABLE "new_contract" RENAME TO "contract";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
