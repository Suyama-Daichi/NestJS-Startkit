import { AuthenticateRequestDto } from '@/dto/auth/authenticate.request.dto';
import { ChangePasswordRequestDto } from '@/dto/auth/changePassword.request.dto';
import { ForgotPasswordRequestDto } from '@/dto/auth/forgotPassword.dto';
import { GetAccessTokenDto } from '@/dto/auth/getAccessToken.request.dto';
import { RegisterRequestDto } from '@/dto/auth/register.request.dto';
import { ResetPasswordRequestDto } from '@/dto/auth/resetPassword.dto';
import { VerifyCodeRequestDto } from '@/dto/auth/verifyCode.request.dto';
import { VerifyAccessTokenDto } from '@/dto/auth/verifyIdToken.request.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
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

  @Post('change-password')
  async changePassword(@Body() user: ChangePasswordRequestDto) {
    try {
      return await this.authService.changePassword(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Body() user: ForgotPasswordRequestDto) {
    try {
      return await this.authService.forgotPassword(user);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() user: ResetPasswordRequestDto) {
    try {
      return await this.authService.resetPassword(user);
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

  @HttpCode(200)
  @Post('verify-access-token')
  async verifyIdToken(@Body() body: VerifyAccessTokenDto) {
    const result = await this.authService.verifyAccessToken(body);
    if (!result) throw new UnauthorizedException();
    return result;
  }

  @HttpCode(200)
  @Post('token')
  async getNewToken(@Body() body: GetAccessTokenDto) {
    return await this.authService.getNewToken(body);
  }
}
