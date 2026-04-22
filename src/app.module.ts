import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BukuModule } from './buku/buku.module';
import { PeminjamanBukuModule } from './peminjaman_buku/peminjaman_buku.module';
import { PengembalianBukuModule } from './pengembalian_buku/pengembalian_buku.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // ✅ Config ENV (tambahan kamu)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),

    // ✅ Module lain tetap
    PrismaModule,
    StudentsModule,
    BukuModule,
    PeminjamanBukuModule,
    PengembalianBukuModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
