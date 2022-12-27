import { IdTokenPayLoad } from '@/models/IdTokenPayLoad';
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import jwt_decode from 'jwt-decode';

const cognitoClient = new CognitoIdentityProviderClient({});

/** CognitoのUserPoolの特定のEmailを持ったユーザーを取得する */
export const fetchListUsers = async (email: string) => {
  const command = new ListUsersCommand({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Filter: `email = "${email}"`,
  });
  const { Users: users } = await cognitoClient.send(command);
  return users;
};

export const getUserNameFromIdToken = (idToken: string) => {
  const decodedJWT = jwt_decode<IdTokenPayLoad>(idToken);

  return decodedJWT['cognito:username'];
};
