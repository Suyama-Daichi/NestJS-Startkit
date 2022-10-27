import { prisma } from '../prismaClient';

export const createUserSeed = async () => {
  const userSeed = await prisma.user.createMany({
    data: [
      {
        email: 'alice@prisma.io',
        name: 'Alice',
      },
      {
        email: 'bob@prisma.io',
        name: 'Bob',
      },
    ],
  });
  console.log(userSeed && '🌱 user data is created.');
};
