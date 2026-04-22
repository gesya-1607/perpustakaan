import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const student = await this.prisma.student.findUnique({
      where: { email: username },
    });

    if (!student) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    if (!student.password) {
      throw new UnauthorizedException('Password tidak valid');
    }

    // ⬇️ FIX DI SINI
    const passwordValid = await bcrypt.compare(password, student.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: student.id,
      email: student.email,
      role: student.UserRole,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
