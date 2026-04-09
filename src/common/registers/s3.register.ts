import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { S3Type } from "../types/s3.type.js";

export const s3Register = registerAs(ConfigKeyEnum.S3, (): S3Type => {
	const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
	const bucketName = process.env.AWS_S3_BUCKET_NAME;
	const region = process.env.AWS_REGION;
	const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

	if (!accessKeyId || !bucketName || !region || !secretAccessKey) {
		throw new Error("Missing required environment variables");
	}

	return {
		accessKeyId,
		bucketName,
		region,
		secretAccessKey,
	};
});
