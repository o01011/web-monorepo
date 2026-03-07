import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/generated/client.js";

const NUMBER_OF_USERS = 5;

const adapter = new PrismaPg({
  connectionString: process.env["POSTGRES_URL"],
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
  for (let i = 0; i < NUMBER_OF_USERS; i++) {
    await prisma.user.create({
      data: {
        username: faker.internet.username(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      },
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
