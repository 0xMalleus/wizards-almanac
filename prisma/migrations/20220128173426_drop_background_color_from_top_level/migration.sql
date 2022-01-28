/*
  Warnings:

  - You are about to drop the column `backgroundColor` on the `Wizards` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wizards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "backgroundName" TEXT NOT NULL DEFAULT 'Black',
    "familiarName" TEXT NOT NULL DEFAULT 'None',
    "bodyName" TEXT NOT NULL DEFAULT 'None',
    "headName" TEXT NOT NULL DEFAULT 'None',
    "propName" TEXT NOT NULL DEFAULT 'None',
    "runeName" TEXT NOT NULL DEFAULT 'None',
    CONSTRAINT "Wizards_backgroundName_fkey" FOREIGN KEY ("backgroundName") REFERENCES "Background" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_familiarName_fkey" FOREIGN KEY ("familiarName") REFERENCES "Familiar" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_bodyName_fkey" FOREIGN KEY ("bodyName") REFERENCES "Body" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_headName_fkey" FOREIGN KEY ("headName") REFERENCES "Head" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_propName_fkey" FOREIGN KEY ("propName") REFERENCES "Prop" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_runeName_fkey" FOREIGN KEY ("runeName") REFERENCES "Rune" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wizards" ("backgroundName", "bodyName", "createdAt", "familiarName", "headName", "id", "image", "name", "propName", "runeName", "updatedAt") SELECT "backgroundName", "bodyName", "createdAt", "familiarName", "headName", "id", "image", "name", "propName", "runeName", "updatedAt" FROM "Wizards";
DROP TABLE "Wizards";
ALTER TABLE "new_Wizards" RENAME TO "Wizards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
