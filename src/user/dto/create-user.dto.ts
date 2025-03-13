import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Endereco, Contato } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @ApiPropertyOptional()
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @IsNotEmpty()
    @ApiProperty()
    @ApiPropertyOptional()
    password: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    @ApiPropertyOptional()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    @ApiPropertyOptional()
    contato: Contato

    @IsNotEmpty()
    @ApiProperty()
    @ApiPropertyOptional()
    endereco: Endereco
}
