import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CognitoJwtVerifier } from 'aws-jwt-verify';

/** ヘッダーのauthorizationトークンを検証する */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  private jwtVerifier = CognitoJwtVerifier.create({
    userPoolId: process.env.COGNITO_USER_POOL_ID,
    tokenUse: 'access',
    clientId: process.env.COGNITO_CLIENT_ID,
    scope: 'aws.cognito.signin.user.admin',
  });
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const result = await this.jwtVerifier.verify(
        request.header('authorization'),
      );
      return !!result;
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException(undefined, error.message);
    }
  }
}
