import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BukuService } from './buku.service';
import { CreateBukuDto } from './dto/create-buku.dto';
import { UpdateBukuDto } from './dto/update-buku.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

// ✅ Tambahan Swagger
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth() 
@Controller('buku')
export class BukuController {
  constructor(private readonly bukuService: BukuService) {}

  // 🔓 SEMUA ROLE BISA LIHAT
  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh data buku' })
  findAll() {
    return this.bukuService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Menampilkan detail buku berdasarkan ID' })
  findOne(@Param('id') id: string) {
    return this.bukuService.findOne(+id);
  }

  @Get('judul/:judul')
  @ApiOperation({ summary: 'Mencari buku berdasarkan judul' })
  findOneByJudul(@Param('judul') judul: string) {
    return this.bukuService.findOneByJudul(judul);
  }

  // 🔐 ADMIN & PETUGAS
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Menambahkan buku (ADMIN & PETUGAS)' })
  create(@Body() dto: CreateBukuDto) {
    return this.bukuService.create(dto);
  }

  // 🔐 ADMIN & PETUGAS
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id')
  @ApiOperation({ summary: 'Update data buku (ADMIN & PETUGAS)' })
  update(@Param('id') id: string, @Body() dto: UpdateBukuDto) {
    return this.bukuService.update(+id, dto);
  }

  // 🔐 ADMIN ONLY
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @ApiOperation({ summary: 'Menghapus buku (ADMIN only)' })
  remove(@Param('id') id: string) {
    return this.bukuService.remove(+id);
  }
}
