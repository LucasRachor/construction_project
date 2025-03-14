/*
  Warnings:

  - Added the required column `status` to the `estoque` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_estoque" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "estoque_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_estoque" ("id", "produtoId", "quantidade") SELECT "id", "produtoId", "quantidade" FROM "estoque";
DROP TABLE "estoque";
ALTER TABLE "new_estoque" RENAME TO "estoque";
CREATE UNIQUE INDEX "estoque_produtoId_key" ON "estoque"("produtoId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
