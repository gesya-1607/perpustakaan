/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_studentId_fkey`;

-- AlterTable
ALTER TABLE `student` ADD COLUMN `role` ENUM('ADMIN', 'PETUGAS', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

-- DropTable
DROP TABLE `user`;
