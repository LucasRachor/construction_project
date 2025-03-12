import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { MESSAGES } from '@nestjs/core/constants';
import { Http2ServerResponse } from 'http2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async findByUsername(username: string) {
    return await this.prisma.usuario.findUnique({
      where: { username }
    })
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const userExist = await this.findByUsername(createUserDto.username)
      if (userExist) {
        throw new HttpException("Usuario já cadastrado! ", HttpStatus.BAD_REQUEST)
      }
      console.log("estou funcionando")
      return await this.prisma.usuario.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          password: createUserDto.password,
          telefone: {
            create: {
              telefone: createUserDto.contato.telefone
            }
          },
          endereco: {
            create: {
              rua: createUserDto.endereco.rua,
              bairro: createUserDto.endereco.bairro,
              cep: createUserDto.endereco.cep,
              cidade: createUserDto.endereco.cidade,
              estado: createUserDto.endereco.estado
            }
          }

        }
      });

    } catch (error) {
      if (error instanceof HttpException) {
        return JSON.stringify(error.message);
      }
      throw new HttpException("Erro interno do servidor", HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async findAll() {
    return await this.prisma.usuario.findMany({
      select: {
        username: true,
        email: true,
        endereco: {
          select: {
            rua: true,
            bairro: true,
            cep: true,
            cidade: true,
            estado: true,
          }
        },
        telefone: {
          select: {
            telefone: true
          }
        }
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
