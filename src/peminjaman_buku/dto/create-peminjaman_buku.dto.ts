import { IsInt, IsDateString } from 'class-validator';

export class CreatePeminjamanBukuDto {
  @IsInt()
  id_buku: number;

  @IsInt()
  id_siswa: number;

  @IsDateString()
  tanggal_pinjam: string;
}