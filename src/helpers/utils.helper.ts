import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from '@aws-sdk/client-cognito-identity-provider';

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
