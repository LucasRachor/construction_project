import { ApiProperty } from '@nestjs/swagger';
import { Estoque } from '@prisma/client';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber } from 'class-validator';

export class CreateProdutoDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    nome: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(36)
    descricao: string

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    preco: number

    @ApiProperty()
    @IsNotEmpty()
    estoque: Estoque

}