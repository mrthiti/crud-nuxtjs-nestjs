import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { UserInterface } from './interfaces/user.interface'
import { UserInsertDto, UserUpdateDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() user: UserInsertDto): Promise<void> {
    return await this.userService.create(user)
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: number, @Body() user: UserUpdateDto): Promise<void> {
    return this.userService.update(uuid, user)
  }

  @Delete(':uuid')
  async delete(@Param('uuid') uuid: number): Promise<void> {
    return await this.userService.delete(uuid)
  }

  @Get()
  async findAll(): Promise<UserInterface[]> {
    return this.userService.findAll()
  }

  @Get(':uuid')
  async find(@Param('uuid') uuid: number): Promise<UserInterface> {
    return await this.userService.find(uuid)
  }
}
