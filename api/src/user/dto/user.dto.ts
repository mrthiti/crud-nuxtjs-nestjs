import { IsNotEmpty, IsEmpty, IsString } from 'class-validator';
import { UserInterface } from '../interfaces/user.interface'

export class UserInsertDto implements UserInterface {
  nickName: string
  facebook: string
  twitter: string
  line: string
  youtube: string
  website: string

  @IsEmpty()
  uuid: number

  @IsString()
  @IsNotEmpty()
  fName: string

  @IsString()
  @IsNotEmpty()
  lName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class UserUpdateDto implements UserInterface {
  nickName: string
  facebook: string
  twitter: string
  line: string
  youtube: string
  website: string
  password: string

  @IsEmpty()
  uuid: number

  @IsString()
  @IsNotEmpty()
  fName: string

  @IsString()
  @IsNotEmpty()
  lName: string

  @IsString()
  @IsNotEmpty()
  email: string
}