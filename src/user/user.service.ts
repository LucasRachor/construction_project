import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async validateUser(createUserDto: CreateUserDto) {
    // validação do username
    const userExist = await this.prisma.usuario.findUnique({
      where: {
        username: createUserDto.username
      }
    })
    if (userExist) {
      throw new HttpException("Usuario já cadastrado!", HttpStatus.BAD_REQUEST)
    }

    // validação do email
    const emailExist = await this.prisma.usuario.findUnique({
      where: {
        email: createUserDto.email
      }
    })
    if (emailExist) {
      throw new HttpException("Email já cadastrado!", HttpStatus.BAD_REQUEST)
    }

    // validacao do telefone
    const phoneExist = await this.prisma.contato.findUnique({
      where: {
        telefone: createUserDto.contato.telefone
      }
    })
    if (phoneExist) {
      throw new HttpException("Telefone já cadastrado!", HttpStatus.BAD_REQUEST)
    }

  }

  async create(createUserDto: CreateUserDto) {
    try {
      await this.validateUser(createUserDto)
      await this.prisma.usuario.create({
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
      return undefined;

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error)
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
