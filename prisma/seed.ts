import { prisma } from './prismaClient';
import { createUserSeed } from './seeds/userSeed';

async function main() {
  await createUserSeed();
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
