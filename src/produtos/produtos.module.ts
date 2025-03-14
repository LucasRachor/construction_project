import { Module } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ProdutosController],
  providers: [ProdutosService, PrismaClient],
})
export class ProdutosModule {}
