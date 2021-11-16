import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(authDto: AuthDto): Promise<any> {
    const result = await this.userRepository.register(authDto);

    return { message: 'User created successfully', result };
  }

  async login(authDto: AuthDto): Promise<any> {
    return this.userRepository.login(authDto);
  }
}
