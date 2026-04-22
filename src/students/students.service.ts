import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateStudentDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.student.create({ data: {
    ...dto,
    password: hashedPassword,
  }, });
  }

  async findAll() {
    return this.prisma.student.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findOneByNis(nis: string) {
    const student = await this.prisma.student.findUnique({ where: { nis } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async findOneByName(name: string) {
    const student = await this.prisma.student.findFirst({ where: { name } });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.student.update({
    where: { id },
    data: dto,
});
  }

  async remove(id: number) {
    // pastikan ada dulu
    await this.findOne(id);
    return this.prisma.student.delete({ where: { id } });
  }
}
