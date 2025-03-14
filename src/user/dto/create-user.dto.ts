import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Endereco, Contato } from "@prisma/client";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string

    @IsNotEmpty()
    @ApiProperty()
    contato: Contato

    @IsNotEmpty()
    @ApiProperty()
    endereco: Endereco
}
