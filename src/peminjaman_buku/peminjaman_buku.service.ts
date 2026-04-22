import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';

@Injectable()
export class PeminjamanBukuService {
  constructor(private prisma: PrismaService) {}

  // ===============================
  // CREATE PEMINJAMAN
  // ===============================
  async create(dto: CreatePeminjamanBukuDto) {

    // cek buku ada atau tidak
    const buku = await this.prisma.buku.findUnique({
      where: { id_buku: dto.id_buku },
    });

    if (!buku) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    // cek apakah buku masih dipinjam
    const masihDipinjam = await this.prisma.peminjaman_Buku.findFirst({
      where: {
        id_buku: dto.id_buku,
        tanggal_kembali: null,
      },
    });

    if (masihDipinjam) {
      throw new BadRequestException('Buku masih dipinjam siswa lain');
    }

    // create peminjaman (tanggal_kembali dipaksa null)
    return this.prisma.peminjaman_Buku.create({
      data: {
        id_buku: dto.id_buku,
        id_siswa: dto.id_siswa,
        tanggal_pinjam: new Date(dto.tanggal_pinjam),
        tanggal_kembali: null,
      },
    });
  }

  // ===============================
  // GET ALL PEMINJAMAN
  // ===============================
  async findAll() {
    return this.prisma.peminjaman_Buku.findMany({
      orderBy: { id_peminjaman: 'desc' },
      include: {
        buku: true,
        siswa: true,
      },
    });
  }

  // ===============================
  // GET ONE PEMINJAMAN
  // ===============================
  async findOne(id: number) {
    const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
      where: { id_peminjaman: id },
      include: {
        buku: true,
        siswa: true,
      },
    });

    if (!peminjaman) {
      throw new NotFoundException('Data peminjaman tidak ditemukan');
    }

    return peminjaman;
  }

  // ===============================
  // GET BY TANGGAL
  // ===============================
  async findByTanggal(tanggal_pinjam: string) {
    return this.prisma.peminjaman_Buku.findMany({
      where: {
        tanggal_pinjam: new Date(tanggal_pinjam),
      },
      include: {
        buku: true,
        siswa: true,
      },
    });
  }

  // ===============================
  // GET HISTORY BY STUDENT
  // ===============================
  async findByStudent(studentId: number) {
    return this.prisma.peminjaman_Buku.findMany({
      where: {
        id_siswa: studentId,
      },
      orderBy: {
        id_peminjaman: 'desc',
      },
      include: {
        buku: true,
        siswa: true,
      },
    });
  }
}
