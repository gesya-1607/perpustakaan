import { Module } from '@nestjs/common';
import { PengembalianBukuService } from './pengembalian_buku.service';
import { PengembalianBukuController } from './pengembalian_buku.controller';

@Module({
  providers: [PengembalianBukuService],
  controllers: [PengembalianBukuController],
})
export class PengembalianBukuModule {}
