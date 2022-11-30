import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from '@/dto/register.request.dto';
import { AuthenticateRequestDto } from '@/dto/authenticate.request.dto';
import { VerifyCodeRequestDto } from '@/dto/verifyCode.request.dto';
import { ChangePasswordRequestDto } from '@/dto/changePassword.request.dto';
import { fetchListUsers } from '@/helpers/utils.helper';
import { ForgotPasswordRequestDto } from '@/dto/forgotPassword.dto';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private configService: ConfigService) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('COGNITO_CLIENT_ID'),
    });
  }

  async register(authRegisterRequest: RegisterRequestDto) {
    const { name, email, password } = authRegisterRequest;
    // メールアドレスの重複がないかチェックする
    const existedUser = await fetchListUsers(email);
    if (existedUser.length > 0) throw new Error('The email is duplicated.');

    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        name,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user);
          }
        },
      );
    });
  }

  async verifyEmail(user: VerifyCodeRequestDto) {
    const { name, code } = user;
    const userData = {
      Username: name,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      return cognitoUser.confirmRegistration(
        code.toString(),
        true,
        function (error, result) {
          if (error) reject(error);
          resolve(result);
        },
      );
    });
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
      });
    });
  }
}
