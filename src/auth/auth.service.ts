import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
// import * as argon2 from 'argon2';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userRepo.findOneBy({ email });
    if (user && password === user.password) {
      const { password, ...result } = user;
      const access_token = await this.jwtService.signAsync({
        ...result,
      });

      return { ...result, access_token };
    }
    // return { message: 'User not found or incorrect password' };
    throw new UnauthorizedException();
  }
}
