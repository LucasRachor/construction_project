import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get('/validate')
  async validateUser(
    @Query('username') username?: string,
    @Query('email') email?: string,
    @Query('telefone') telefone?: string
  ) {
    if (!username && !email && !telefone) {
      throw new HttpException('É necessário fornecer pelo menos um parâmetro (username, email ou telefone)',
        HttpStatus.BAD_REQUEST);
    }


    return this.userService.validate({ username, email, telefone })
  }
}
