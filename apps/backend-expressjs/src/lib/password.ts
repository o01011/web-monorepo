import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;
const KEY_LENGTH = 64;

export const hashPassword = async (password: string): Promise<string> => {
	const salt = randomBytes(16);
	const hash = await scryptAsync(password, salt, KEY_LENGTH);

	return `${salt.toString("hex")}:${hash.toString("hex")}`;
};

export const verifyPassword = async (password: string, encodedHash: string): Promise<boolean> => {
	const [saltHex, hashHex, extra] = encodedHash.split(":");

	if (!saltHex || !hashHex || extra !== undefined || !/^[\da-f]{32}$/i.test(saltHex) || !/^[\da-f]{128}$/i.test(hashHex)) {
		return false;
	}

	const expectedHash = Buffer.from(hashHex, "hex");
	const actualHash = await scryptAsync(password, Buffer.from(saltHex, "hex"), KEY_LENGTH);

	return timingSafeEqual(actualHash, expectedHash);
};
