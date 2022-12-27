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

  /**
   * 新規登録
   * @param body 新規登録に必要なパラメータ
   */
  @Post('register')
  async register(@Body() body: RegisterRequestDto) {
    try {
      return await this.authService.register(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * コード認証
   * @param body コード認証に必要なパラメータ
   */
  @Post('verify')
  async verify(@Body() body: VerifyCodeRequestDto) {
    try {
      return await this.authService.verifyEmail(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * パスワードの変更
   * @param body パスワード変更に必要なパラメータ
   */
  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordRequestDto) {
    try {
      return await this.authService.changePassword(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * パスワードを忘れた時
   * @param body パスワードの再設定を開始するときのパラメータ
   */
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequestDto) {
    try {
      return await this.authService.forgotPassword(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * パスワードを再設定する
   * @param body パスワードを再設定するときのパラメータ
   */
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordRequestDto) {
    try {
      return await this.authService.resetPassword(body);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * ログイン
   * @param authenticateRequest ログインに必要なパラメータ
   */
  @Post('authenticate')
  async authenticate(@Body() authenticateRequest: AuthenticateRequestDto) {
    try {
      return await this.authService.authenticate(authenticateRequest);
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  /**
   * アクセストークンを検証する
   * @param body アクセストークンを検証するためのパラメータ
   * @returns true
   */
  @HttpCode(200)
  @Post('verify-access-token')
  async verifyIdToken(@Body() body: VerifyAccessTokenDto) {
    const result = await this.authService.verifyAccessToken(body);
    if (!result) throw new UnauthorizedException();
    return result;
  }

  /**
   * トークンを更新する
   * @param body トークンを更新するためのパラメータ
   */
  @HttpCode(200)
  @Post('token')
  async getNewToken(@Body() body: GetAccessTokenDto) {
    return await this.authService.getNewToken(body);
  }
}
