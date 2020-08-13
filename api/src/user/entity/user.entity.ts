import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from '../interfaces/user.interface'

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  uuid: number

  @Column()
  fName: string

  @Column()
  lName: string

  @Column({nullable: true})
  nickName: string

  @Column()
  email: string

  @Column()
  password: string

  @Column({nullable: true})
  facebook: string

  @Column({nullable: true})
  twitter: string

  @Column({nullable: true})
  line: string

  @Column({nullable: true})
  youtube: string

  @Column({nullable: true})
  website: string
}