import { Controller, Get, Query, Post, Body, Put, Delete, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { UserInterface } from './interfaces/user.interface'
import { UserInsertDto, UserUpdateDto } from './dto/user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() user: UserInsertDto): void {
    return this.userService.create(user)
  }

  @Put(':uuid')
  update(@Param('uuid') uuid: number, @Body() user: UserUpdateDto): void {
    return this.userService.update(uuid, user)
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: number): void {
    return this.userService.delete(uuid)
  }

  @Get()
  findAll(): UserInterface[] {
    return this.userService.findAll()
  }

  @Get(':uuid')
  find(@Param('uuid') uuid: number): UserInterface {
    return this.userService.find(uuid)
  }
}
