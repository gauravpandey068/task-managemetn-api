import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RegisterAuthDto } from '../dto/register.auth.dto';
import { LoginAuthDto } from '../dto/login.auth.dto';
import { Auth } from '../entities/auth.entity';

import * as bcrypt from 'bcrypt';
@EntityRepository(Auth)
export class UserRepository extends Repository<Auth> {
  //register user
  async register(registerAuthDto: RegisterAuthDto): Promise<Auth> {
    const { email, password, firstName, lastName } = registerAuthDto;

    const salt = await bcrypt.genSalt();

    const user = new Auth();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = salt;

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
    delete user.password;
    delete user.salt;

    return user;
  }

  //login user
  async login(loginAuthDto: LoginAuthDto): Promise<string> {
    const { email, password } = loginAuthDto;

    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      return null;
    }
  }

  //secure password with salt
  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
