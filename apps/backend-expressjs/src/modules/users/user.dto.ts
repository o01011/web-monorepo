import type { User } from "@web-monorepo/db";

export type UserDto = Omit<User, "password" | "createdAt" | "updatedAt"> & {
	createdAt: string;
	updatedAt: string;
};

export const toUserDto = ({ password: _password, createdAt, updatedAt, ...user }: User): UserDto => ({
	...user,
	createdAt: createdAt.toISOString(),
	updatedAt: updatedAt.toISOString(),
});
