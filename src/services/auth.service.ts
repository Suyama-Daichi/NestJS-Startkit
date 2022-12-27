import { Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from '@/dto/auth/register.request.dto';
import { AuthenticateRequestDto } from '@/dto/auth/authenticate.request.dto';
import { fetchListUsers } from '@/helpers/utils.helper';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { ChangePasswordRequestDto } from '@/dto/auth/changePassword.request.dto';
import { ForgotPasswordRequestDto } from '@/dto/auth/forgotPassword.dto';
import { VerifyCodeRequestDto } from '@/dto/auth/verifyCode.request.dto';
import { VerifyAccessTokenDto } from '@/dto/auth/verifyIdToken.request.dto';
import { ResetPasswordRequestDto } from '@/dto/auth/resetPassword.dto';
import { UserService } from '@/services/user.service';
import { GetAccessTokenDto } from '@/dto/auth/getAccessToken.request.dto';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

const cognito = new CognitoIdentityServiceProvider({
  apiVersion: '2022-04-18',
  region: 'ap-northeast-1',
});

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    });
  }

  async register(authRegisterRequest: RegisterRequestDto) {
    const { email, password, last_name, first_name } = authRegisterRequest;
    // メールアドレスの重複がないかチェックする
    const existedUser = await fetchListUsers(email);
    if (existedUser.length > 0) throw new Error('The email is duplicated.');

    // Cognitoにユーザーを追加
    const cognitoResult = await cognito
      .adminCreateUser({
        Username: email,
        TemporaryPassword: password,
        UserPoolId: this.userPool.getUserPoolId(),
        UserAttributes: [
          {
            Name: 'email',
            Value: email,
          },
          {
            Name: 'email_verified',
            Value: 'True',
          },
        ],
      })
      .promise();

    // DBに追加
    const createUserDataResult = await this.userService.createUser({
      auth_uid: cognitoResult.User.Username,
      email,
      last_name,
      first_name,
      email_confirmed: true,
    });

    return { cognitoResult, createUserDataResult };
  }

  async verifyEmail(user: VerifyCodeRequestDto) {
    const { name, code } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const cognitoResult = await new Promise((resolve, reject) => {
      return cognitoUser.confirmRegistration(
        code,
        true,
        function (error, result) {
          if (error) reject(error);
          resolve(result);
        },
      );
    });

    const createUserDataResult = await this.userService.updateUser(name, {
      auth_uid: name,
      email_confirmed: true,
    });

    return { cognitoResult, createUserDataResult };
  }

  async changePassword(user: ChangePasswordRequestDto) {
    const { name, old_password, password } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: old_password,
    });
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          cognitoUser.changePassword(
            old_password,
            password,
            function (error, result) {
              if (error) reject(error);
              resolve(result);
            },
          );
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async forgotPassword(user: ForgotPasswordRequestDto) {
    const { name } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async resetPassword(user: ResetPasswordRequestDto) {
    const { name, code, password } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.confirmPassword(code.toString(), password, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async authenticate(user: AuthenticateRequestDto) {
    const { name, password } = user;
    const authenticationDetails = new AuthenticationDetails({
      Username: name,
      Password: password,
    });
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const newUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          newUser.completeNewPasswordChallenge(password, requiredAttributes, {
            onSuccess: function (result) {
              resolve(result);
            },
            onFailure: function (error) {
              reject(error);
            },
          });
        },
      });
    });
  }

  async verifyAccessToken(userReq: VerifyAccessTokenDto) {
    const jwtVerifier = CognitoJwtVerifier.create({
      userPoolId: process.env.COGNITO_USER_POOL_ID,
      tokenUse: 'access',
      clientId: process.env.COGNITO_CLIENT_ID,
      scope: 'aws.cognito.signin.user.admin',
    });

    try {
      const result = await jwtVerifier.verify(userReq.accessToken);
      return !!result;
    } catch (error) {
      return false;
    }
  }

  async getNewToken(userReq: GetAccessTokenDto) {
    const { refreshToken } = userReq;
    try {
      const result = await cognito
        .adminInitiateAuth({
          UserPoolId: this.userPool.getUserPoolId(),
          ClientId: this.userPool.getClientId(),
          AuthFlow: 'REFRESH_TOKEN_AUTH',
          AuthParameters: {
            REFRESH_TOKEN: refreshToken,
          },
        })
        .promise();
      const { AccessToken, IdToken } = result.AuthenticationResult;
      return { AccessToken, IdToken };
    } catch (error) {
      throw new UnauthorizedException(undefined, error);
    }
  }
}
