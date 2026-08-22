import { faker } from "@faker-js/faker";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../dist/index.js";

const NUMBER_OF_USERS = 5;

const adapter = new PrismaPg({
	connectionString: process.env.POSTGRES_URL,
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
	for (let i = 0; i < NUMBER_OF_USERS; i++) {
		await prisma.user.create({
			data: {
				email: faker.internet.email(),
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				password: faker.internet.password(),
				username: faker.internet.username(),
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
