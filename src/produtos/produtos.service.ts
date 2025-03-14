import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Injectable()
export class ProdutosService {
    constructor(private readonly prisma: PrismaClient) { }

    async findAll() {
        return await this.prisma.produto.findMany({
            select: {
                nome: true,
                descricao: true,
                preco: true,
                estoque: {
                    select: {
                        quantidade: true,
                        status: true
                    }
                }
            },

        })
    }

    async createProduto(createProdutoDto: CreateProdutoDto) {
        await this.prisma.produto.create({
            data: {
                descricao: createProdutoDto.descricao,
                nome: createProdutoDto.nome,
                preco: createProdutoDto.preco,
                estoque: {
                    create: {
                        quantidade: createProdutoDto.estoque.quantidade,
                        status: createProdutoDto.estoque.status
                    }
                }
            }
        })
    }

}
