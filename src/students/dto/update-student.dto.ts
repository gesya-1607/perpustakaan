import { UserRole } from '@prisma/client';

export class UpdateStudentDto {
  nis?: string;
  name?: string;
  email?: string;
  kelas?: string;
  jurusan?: string;
  password?: string;
  UserRole?: UserRole;
}
