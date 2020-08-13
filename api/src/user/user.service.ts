import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { UserInterface } from './interfaces/user.interface'
import { User as UserEntity } from './entity/user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

  async create(user: UserInterface): Promise<void> {
    const foundUser = await this.userRepository.findOne({ email: user.email })

    if (foundUser) throw new HttpException("Email is already", HttpStatus.BAD_REQUEST)

    await this.userRepository.insert(user)
  }

  async update(uuid: number, user: UserInterface): Promise<void> {

    const foundUser = await this.userRepository.findOne({ uuid: Not(uuid), email: user.email })

    if (foundUser) throw new HttpException("Email is already", HttpStatus.BAD_REQUEST)

    const updateUser = await this.userRepository.findOne({ uuid })

    if(!user.password) delete user.password

    const update = {
      ...updateUser,
      ...user
    }

    await this.userRepository.save(update)
  }

  async delete(uuid: number): Promise<void> {
    await this.userRepository.delete({uuid})
  }

  async findAll(): Promise<UserInterface[]> {
    return await this.userRepository.find()
  }

  async find(uuid: number): Promise<UserInterface> {
    const user = await this.userRepository.findOne({ uuid })

    if (!user) throw new HttpException("Not Found", HttpStatus.NOT_FOUND)

    return user
  }
}
