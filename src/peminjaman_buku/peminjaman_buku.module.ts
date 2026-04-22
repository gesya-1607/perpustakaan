import { Module } from '@nestjs/common';
import { PeminjamanBukuService } from './peminjaman_buku.service';
import { PeminjamanBukuController } from './peminjaman_buku.controller';

@Module({
  providers: [PeminjamanBukuService],
  controllers: [PeminjamanBukuController],
})
export class PeminjamanBukuModule {}
