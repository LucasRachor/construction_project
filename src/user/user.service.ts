import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async validateUsername(username: string) {
    const user = await this.prisma.usuario.findUnique({
      where: {
        username: username
      }
    })
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  async validateEmail(email: string) {
    const emailExist = await this.prisma.usuario.findUnique({
      where: {
        email: email
      }
    })
    if (emailExist) {
      return true;
    } else {
      return false;
    }
  }

  async validatePhone(phone: string) {
    const phoneExist = await this.prisma.contato.findUnique({
      where: {
        telefone: phone
      }
    })
    if (phoneExist) {
      return true;
    } else {
      return false;
    }
  }

  private validators = {
    username: this.validateUsername.bind(this),
    email: this.validateEmail.bind(this),
    telefone: this.validatePhone.bind(this)
  }

  async validate(params: Record<string, string>) {
    const results: Record<string, boolean> = {};

    await Promise.all(
      Object.entries(params).map(async ([key, value]) => {
        if (this.validators[key]) {
          console.log(this.validators)
          results[key] = await this.validators[key](value);
        }
      })
    )
    return results;

  }

  async create(createUserDto: CreateUserDto) {
    try {
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

}
