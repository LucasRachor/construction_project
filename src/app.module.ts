import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [UserModule],
  controllers: [],
  providers: [UserService, PrismaClient],
})
export class AppModule {}
