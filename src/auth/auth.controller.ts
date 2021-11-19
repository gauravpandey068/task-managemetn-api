import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register.auth.dto';
import { LoginAuthDto } from './dto/login.auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //for signup
  @Post('signup')
  signUp(@Body(ValidationPipe) registerAuthDto: RegisterAuthDto): Promise<any> {
    return this.authService.signUp(registerAuthDto);
  }

  //for login
  @Post('login')
  login(@Body(ValidationPipe) loginAuthDto: LoginAuthDto): Promise<any> {
    return this.authService.login(loginAuthDto);
  }
}
