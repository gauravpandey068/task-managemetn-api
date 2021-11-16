import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';
import { LoginAuthDto } from '../dto/login.auth.dto';
import { Auth } from '../entities/auth.entity';

@EntityRepository(Auth)
export class UserRepository extends Repository<Auth> {
  //register user
  async register(authDto: AuthDto): Promise<Auth> {
    const { email, password, firstName, lastName } = authDto;

    const user = new Auth();
    user.email = email;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  //login user
  async login(loginAuthDto: LoginAuthDto): Promise<Auth> {
    const { email, password } = loginAuthDto;

    try {
      const user = await this.findOne({ email });
      if (user && user.password === password) {
        return user;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
