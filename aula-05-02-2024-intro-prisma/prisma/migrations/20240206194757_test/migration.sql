/*
  Warnings:

  - Added the required column `teste` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "teste" VARCHAR(60) NOT NULL;
