import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserPassword } from './userPassword.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserPassword])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
