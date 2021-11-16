import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //for signup
  @Post('signup')
  signUp(@Body(ValidationPipe) authDto: AuthDto): Promise<any> {
    return this.authService.signUp(authDto);
  }

  //for login
  @Post('login')
  login(@Body() authDto: AuthDto): Promise<any> {
    return this.authService.login(authDto);
  }
}
