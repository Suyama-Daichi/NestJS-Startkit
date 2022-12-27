import { prisma } from '../prismaClient';

export const createUserSeed = async () => {
  const userSeed = await prisma.user.createMany({
    data: [
      {
        email: 'alice@prisma.io',
      },
      {
        email: 'bob@prisma.io',
      },
    ],
  });
  console.log(userSeed && '🌱 user data is created.');
};
