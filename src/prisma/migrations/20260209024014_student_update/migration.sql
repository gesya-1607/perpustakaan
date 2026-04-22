/*
  Warnings:

  - Added the required column `UserRole` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `student` ADD COLUMN `UserRole` ENUM('ADMIN', 'PETUGAS', 'STUDENT') NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
