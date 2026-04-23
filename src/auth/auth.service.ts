import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // ✅ REGISTER (SUDAH FIX)
  async register(
    email: string,
    name: string,
    password: string,
    UserRole: 'ADMIN' | 'PETUGAS' | 'STUDENT',
  ) {
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      throw new BadRequestException('Email sudah digunakan');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        UserRole: UserRole, // ✅ FIX
      },
    });

    return {
      message: 'Register berhasil',
      user,
    };
  }

  // ✅ LOGIN (TETAP)
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Email tidak ditemukan');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.UserRole,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}