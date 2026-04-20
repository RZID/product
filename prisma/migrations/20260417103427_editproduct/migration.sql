/*
  Warnings:

  - Made the column `category` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` MODIFY `category` VARCHAR(191) NOT NULL;
