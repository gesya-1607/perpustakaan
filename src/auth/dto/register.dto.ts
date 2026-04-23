import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: UserRole }) // 🔥 biar muncul di swagger
  @IsEnum(UserRole) // 🔥 biar validasi benar
  UserRole: UserRole;
}