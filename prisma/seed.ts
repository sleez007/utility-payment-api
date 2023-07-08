import { CategoryName, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.utilityCategory.createMany({
    data: [
      { categoryName: CategoryName.POWER, parameter: 'power' },
      { categoryName: CategoryName.AIRTIME, parameter: 'airtime' },
      { categoryName: CategoryName.INTERNET, parameter: 'internet' },
      { categoryName: CategoryName.DATA, parameter: 'data_bundle' },
      { categoryName: CategoryName.CABLE, parameter: 'cable' },
    ],
  });

  console.log(categories);
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
