import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany({});

	const amountOfUsers = 50;

	const users: User[] = [];

	for (let i = 0; i < amountOfUsers; ++i) {
		const user: User = {
			id: i,
			createdAt: faker.date.past(),
			updatedAt: faker.date.recent(),
			username: faker.internet.username(),
		};

		users.push(user);
	}

	const addUsers = async () => await prisma.user.createMany({ data: users });

	addUsers();
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
