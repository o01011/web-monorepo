import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const fakerUser = () => ({
	name: `${faker.person.firstName()} ${faker.person.lastName()}`,
	email: faker.internet.email(),
});

const fakerPost = (userId: number) => ({
	description: faker.lorem.sentence(),
	userId,
});

async function main() {
	const userCount = 10;

	for (let i = 0; i < userCount; i++) {
		const user = await prisma.user.create({ data: fakerUser() });

		const postCount = faker.number.int({ min: 1, max: 5 });
		for (let j = 0; j < postCount; j++) {
			await prisma.post.create({ data: fakerPost(user.id) });
		}
	}

	console.log(`Seeds successfully applied!`);
}

main()
	.catch(e => console.error(e))
	.finally(async () => await prisma.$disconnect());
