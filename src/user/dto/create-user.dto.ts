import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Endereco } from "@prisma/client";
import { Contato } from "@prisma/client";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @MinLength(4)
    @MaxLength(16)
    @IsNotEmpty()
    password: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    contato: Contato

    @IsNotEmpty()
    endereco: Endereco
}
