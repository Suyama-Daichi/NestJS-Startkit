import { prisma } from './prismaClient';

async function main() {
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
  console.log(userSeed);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
