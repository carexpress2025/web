import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const plans = [
    {
      name: 'Free',
    },
    {
      name: 'Basic',
    },
  ];

  for (const plan of plans) {
    await prisma.subscription.create({
      data: plan,
    });
  }

  console.log('Subscription plans created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
