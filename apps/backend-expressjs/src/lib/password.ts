import { randomBytes, scrypt } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY_LENGTH = 64;

export const hashPassword = async (password: string): Promise<string> => {
	const salt = randomBytes(16);
	const hash = await scryptAsync(password, salt, KEY_LENGTH);

	return `${salt.toString("hex")}:${hash.toString("hex")}`;
};
