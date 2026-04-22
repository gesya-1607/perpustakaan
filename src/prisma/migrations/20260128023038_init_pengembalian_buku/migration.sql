-- DropForeignKey
ALTER TABLE `peminjaman_buku` DROP FOREIGN KEY `Peminjaman_Buku_id_buku_fkey`;

-- DropForeignKey
ALTER TABLE `peminjaman_buku` DROP FOREIGN KEY `Peminjaman_Buku_id_siswa_fkey`;

-- DropIndex
DROP INDEX `Peminjaman_Buku_id_buku_fkey` ON `peminjaman_buku`;

-- DropIndex
DROP INDEX `Peminjaman_Buku_id_siswa_fkey` ON `peminjaman_buku`;

-- CreateTable
CREATE TABLE `Pengembalian_Buku` (
    `id_pengembalian` INTEGER NOT NULL AUTO_INCREMENT,
    `id_peminjaman` INTEGER NOT NULL,
    `tanggal_kembali` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pengembalian`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Peminjaman_Buku` ADD CONSTRAINT `Peminjaman_Buku_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `Buku`(`id_buku`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Peminjaman_Buku` ADD CONSTRAINT `Peminjaman_Buku_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pengembalian_Buku` ADD CONSTRAINT `Pengembalian_Buku_id_peminjaman_fkey` FOREIGN KEY (`id_peminjaman`) REFERENCES `Peminjaman_Buku`(`id_peminjaman`) ON DELETE RESTRICT ON UPDATE CASCADE;
