/*
  Warnings:

  - You are about to drop the `Traits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_TraitsToWizards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Traits_type_value_key";

-- DropIndex
DROP INDEX "_TraitsToWizards_B_index";

-- DropIndex
DROP INDEX "_TraitsToWizards_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Traits";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_TraitsToWizards";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Background" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "hex" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Body" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Familiar" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Head" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Prop" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Rune" (
    "name" TEXT COLLATE NOCASE NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wizards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT COLLATE NOCASE NOT NULL,
    "image" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "backgroundName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'Black',
    "familiarName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'None',
    "bodyName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'None',
    "headName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'None',
    "propName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'None',
    "runeName" TEXT COLLATE NOCASE NOT NULL DEFAULT 'None',
    CONSTRAINT "Wizards_backgroundName_fkey" FOREIGN KEY ("backgroundName") REFERENCES "Background" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_familiarName_fkey" FOREIGN KEY ("familiarName") REFERENCES "Familiar" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_bodyName_fkey" FOREIGN KEY ("bodyName") REFERENCES "Body" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_headName_fkey" FOREIGN KEY ("headName") REFERENCES "Head" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_propName_fkey" FOREIGN KEY ("propName") REFERENCES "Prop" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Wizards_runeName_fkey" FOREIGN KEY ("runeName") REFERENCES "Rune" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wizards" ("backgroundColor", "createdAt", "id", "image", "name", "updatedAt") SELECT "backgroundColor", "createdAt", "id", "image", "name", "updatedAt" FROM "Wizards";
DROP TABLE "Wizards";
ALTER TABLE "new_Wizards" RENAME TO "Wizards";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Background_name_key" ON "Background"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Body_name_key" ON "Body"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Familiar_name_key" ON "Familiar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Head_name_key" ON "Head"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Prop_name_key" ON "Prop"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Rune_name_key" ON "Rune"("name");
