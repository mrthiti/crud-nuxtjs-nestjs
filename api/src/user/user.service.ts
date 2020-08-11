import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import {UserInterface} from './interfaces/user.interface'

@Injectable()
export class UserService {
  private currentUuid = 0
  private users: UserInterface[] = []

  create(user: UserInterface): void {
    if(this.users.find(it => it.email === user.email)) throw new HttpException("Email is already", HttpStatus.BAD_REQUEST)

    this.users.push({ ...user, uuid: ++this.currentUuid })
  }

  update(uuid: number, user: UserInterface): void {
    if(this.users.find(it => (it.email === user.email && +it.uuid !== +uuid))) throw new HttpException("Email is already", HttpStatus.BAD_REQUEST)

    this.users = this.users.map(it => {
      return (+it.uuid === +uuid)
        ? { ...it, ...user, ...(!user.password ? {password: it.password} : {})}
        : it
    })
  }

  delete(uuid: number): void {
    this.users = this.users.filter(it => +it.uuid !== +uuid)
  }

  findAll(): UserInterface[] {
    return this.users
  }

  find(uuid: number): UserInterface {

    const user = this.users.find(it => +it.uuid === +uuid)

    if(!user) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)

    return user
  }
}
