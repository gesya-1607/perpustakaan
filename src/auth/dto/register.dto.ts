import { IsEmail, IsString, IsEnum } from 'class-validator';

enum UserRole {
  ADMIN = 'ADMIN',
  PETUGAS = 'PETUGAS',
  STUDENT = 'STUDENT',
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  UserRole: UserRole;
}