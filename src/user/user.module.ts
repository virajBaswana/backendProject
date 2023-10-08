import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSubscriber } from './user.db-subscriber';
// import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
// import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]), JwtModule],
  controllers: [UserController],
  providers: [UserService, UserSubscriber],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
