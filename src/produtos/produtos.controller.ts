import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { CreateProdutoDto } from './dto/create-produto.dto';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  async findall() {
    return await this.produtosService.findAll();
  }

  @Post()
  async createProduto(@Body() createProdutoDto: CreateProdutoDto) {
    return await this.produtosService.createProduto(createProdutoDto)
  }
}
