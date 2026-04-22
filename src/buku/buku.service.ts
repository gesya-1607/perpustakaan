import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

@Injectable()
export class BukuService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBukuDto) {
    return this.prisma.buku.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.buku.findMany({
      orderBy: { id_buku: 'desc' },
    });
  }

  async findOne(id: number) {
    const buku = await this.prisma.buku.findUnique({
      where: { id_buku: id },
    });

    if (!buku) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    return buku;
  }

  async findOneByJudul(judul: string) {
    const buku = await this.prisma.buku.findMany({
      where: { judul },
    });

    if (!buku) {
      throw new NotFoundException('Buku tidak ditemukan');
    }

    return buku;
  }

  async update(id: number, dto: UpdateBukuDto) {
    await this.findOne(id);

    return this.prisma.buku.update({
      where: { id_buku: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.buku.delete({
      where: { id_buku: id },
    });
  }
}
