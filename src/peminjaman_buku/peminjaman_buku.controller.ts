import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { PeminjamanBukuService } from './peminjaman_buku.service';
import { CreatePeminjamanBukuDto } from './dto/create-peminjaman_buku.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('peminjaman-buku')
@ApiBearerAuth()
@Controller('peminjaman-buku')
export class PeminjamanBukuController {
  constructor(private readonly peminjamanBukuService: PeminjamanBukuService) {}

  // ===============================
  // SISWA - HISTORY SENDIRI
  // ===============================
  @Get('my-history')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Melihat riwayat peminjaman buku (SISWA)' })
  getMyHistory(@Request() req) {
    return this.peminjamanBukuService.findByStudent(req.user.sub);
  }

  // ===============================
  // ADMIN & PETUGAS - FILTER TANGGAL
  // ===============================
  @Get('tanggal/:tanggal_peminjam')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findByTanggal(@Param('tanggal_peminjam') tanggal: string) {
    return this.peminjamanBukuService.findByTanggal(tanggal);
  }

  // ===============================
  // ADMIN & PETUGAS - LIHAT SEMUA
  // ===============================
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.peminjamanBukuService.findAll();
  }

  // ===============================
  // ADMIN & PETUGAS - LIHAT BY ID
  // ===============================@UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peminjamanBukuService.findOne(id);
  }

  // ===============================
  // ADMIN & PETUGAS - CREATE
  // ===============================
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() dto: CreatePeminjamanBukuDto) {
    return this.peminjamanBukuService.create(dto);
  }
}
