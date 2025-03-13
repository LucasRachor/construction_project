import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async validateUsername(username: string) {
    if (!username) {
      return "Não informado";
    }
    const userExist = await this.prisma.usuario.findUnique({
      where: {
        username: username
      }
    })

    return !!userExist;
  }

  async validateEmail(email: string) {
    if (!email) {
      return "Não informado";
    }
    const emailExist = await this.prisma.usuario.findUnique({
      where: {
        email: email
      }
    })

    return !!emailExist;
  }

  async validatePhone(phone?: string) {
    if (!phone) {
      return "Não informado"
    };
  
    const phoneExist = await this.prisma.contato.findUnique({
      where: { telefone: phone }
    });
  
    return !!phoneExist;
  }

  private validators = {
    username: this.validateUsername.bind(this),
    email: this.validateEmail.bind(this),
    telefone: this.validatePhone.bind(this)
  }

  async validate(params: Partial<{ username: string; email: string; telefone: string }>) {
    const results: Record<string, boolean> = {};

    await Promise.all(
      Object.entries(params).map(async ([key, value]) => {
        if (this.validators[key]) {
          results[key] = await this.validators[key](value);
        }
      })
    );
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
