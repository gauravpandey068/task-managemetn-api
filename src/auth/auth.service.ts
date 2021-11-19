import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';
import { UserRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(registerAuthDto: RegisterAuthDto): Promise<any> {
    const respond = await this.userRepository.register(registerAuthDto);

    return { message: 'User created successfully', respond };
  }

  async login(loginAuthDto: LoginAuthDto): Promise<any> {
    const email = await this.userRepository.login(loginAuthDto);

    if (!email) {
      throw new UnauthorizedException('Invalid Credentials');
    } else {
      return { message: 'User logged in successfully' };
    }
  }
}
