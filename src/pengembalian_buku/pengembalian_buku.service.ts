import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';

@Injectable()
export class PengembalianBukuService {
  constructor(private readonly prisma: PrismaService) {}

  // =========================
  // CREATE PENGEMBALIAN
  // =========================
  async create(dto: CreatePengembalianBukuDto) {
    const peminjaman = await this.prisma.peminjaman_Buku.findUnique({
      where: { id_peminjaman: dto.id_peminjaman },
      include: { pengembalian: true },
    });

    if (!peminjaman) {
      throw new NotFoundException('Peminjaman tidak ditemukan');
    }

    if (peminjaman.pengembalian.length > 0) {
      throw new BadRequestException('Buku sudah dikembalikan');
    }

    return this.prisma.pengembalian_Buku.create({
      data: {
        id_peminjaman: dto.id_peminjaman,
        tanggal_kembali: dto.tanggal_kembali ?? new Date(),
      },
    });
  }

  // =========================
  // STUDENT - HISTORY SENDIRI
  // =========================
  async findMyHistory(userId: number) {
    return this.prisma.pengembalian_Buku.findMany({
      where: {
        peminjaman: {
          id_siswa: userId,
        },
      },
      orderBy: {
        id_pengembalian: 'desc',
      },
      include: {
        peminjaman: {
          include: {
            buku: true,
          },
        },
      },
    });
  }

  // =========================
  // GET ALL HISTORY
  // =========================
  async findAll() {
    return this.prisma.pengembalian_Buku.findMany({
      orderBy: {
        id_pengembalian: 'desc',
      },
      include: {
        peminjaman: {
          include: {
            buku: true,
            siswa: true,
          },
        },
      },
    });
  }

  // =========================
  // GET DETAIL BY ID
  // =========================
  async findOne(id: number) {
    const data = await this.prisma.pengembalian_Buku.findUnique({
      where: {
        id_pengembalian: id,
      },
      include: {
        peminjaman: {
          include: {
            buku: true,
            siswa: true,
          },
        },
      },
    });

    if (!data) {
      throw new NotFoundException('Data pengembalian tidak ditemukan');
    }

    return data;
  }

  // =========================
  // DELETE DATA
  // =========================
  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.pengembalian_Buku.delete({
      where: {
        id_pengembalian: id,
      },
    });
  }
}
