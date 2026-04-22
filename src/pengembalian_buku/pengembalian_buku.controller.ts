import {
  Body,
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { PengembalianBukuService } from './pengembalian_buku.service';
import { CreatePengembalianBukuDto } from './dto/create-pengembalian_buku.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('pengembalian-buku')
@ApiBearerAuth()
@Controller('pengembalian-buku')
export class PengembalianBukuController {
  constructor(
    private readonly pengembalianBukuService: PengembalianBukuService,
  ) {}

  // ===============================
  // STUDENT - HISTORY SENDIRI
  // ===============================
  @Get('my-history')
  @Roles(UserRole.STUDENT)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getMyHistory(@Request() req) {
    return this.pengembalianBukuService.findMyHistory(req.user.sub);
  }

  // ===============================
  // HISTORY SEMUA PENGEMBALIAN
  // ===============================
  @Get('history')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  getAllHistory() {
    return this.pengembalianBukuService.findAll();
  }

  // ===============================
  // ADMIN & PETUGAS - CREATE
  // ===============================
  @Post()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @ApiOperation({ summary: 'Menambahkan data pengembalian buku (ADMIN & PETUGAS)' })
  create(@Body() dto: CreatePengembalianBukuDto) {
    return this.pengembalianBukuService.create(dto);
  }

  // ===============================
  // ADMIN & PETUGAS - LIHAT SEMUA
  // ===============================
  @Get()
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll() {
    return this.pengembalianBukuService.findAll();
  }

  // ===============================
  // ADMIN & PETUGAS - LIHAT BY ID
  // ===============================
  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pengembalianBukuService.findOne(id);
  }

  // ===============================
  // ADMIN - DELETE
  // ===============================
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pengembalianBukuService.remove(id);
  }
}
