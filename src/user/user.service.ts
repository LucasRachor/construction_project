import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}
  
  async create(createUserDto: CreateUserDto) {
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
