import { AuthenticateRequestDto } from '@/dto/authenticate.request.dto';
import { ChangePasswordRequestDto } from '@/dto/changePassword.request.dto';
import { RegisterRequestDto } from '@/dto/register.request.dto';
import { VerifyCodeRequestDto } from '@/dto/verifyCode.request.dto';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerRequest: RegisterRequestDto) {
    try {
      return await this.authService.register(registerRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('verify')
  async verify(@Body() verifyRequest: VerifyCodeRequestDto) {
    try {
      return await this.authService.verifyEmail(verifyRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('changePassword')
  async changePassword(@Body() user: ChangePasswordRequestDto) {
    try {
      return await this.authService.changePassword(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() user: ChangePasswordRequestDto) {
    try {
      return await this.authService.forgotPassword(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      return await this.authService.authenticate(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
