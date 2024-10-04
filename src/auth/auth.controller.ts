import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() body: any) {
    return this.authService.signIn(body);
  }
}
