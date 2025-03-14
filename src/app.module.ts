import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PrismaClient } from '@prisma/client';
import { ProdutosModule } from './produtos/produtos.module';

@Module({
  imports: [UserModule, ProdutosModule],
  controllers: [],
  providers: [UserService, PrismaClient],
})
export class AppModule {}
