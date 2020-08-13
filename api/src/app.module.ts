import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User as UserEntity } from './user/entity/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.NODE_ENV === "development" ? "localhost" : "mariadb",
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'crud',
      entities: [UserEntity],
      synchronize: true,
    }),
    UserModule
  ]
})
export class AppModule { }
