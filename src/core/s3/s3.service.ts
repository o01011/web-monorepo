import { randomUUID } from "node:crypto";
import { extname } from "node:path";
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ConfigKeyEnum } from "../../common/enums/config.enum.js";
import { S3Type } from "../../common/types/s3.type.js";

@Injectable()
export class S3Service {
	private s3Client: S3Client;
	private bucketName: string;

	constructor(@Inject(ConfigService) readonly configService: ConfigService) {
		const s3Config = configService.getOrThrow<S3Type>(ConfigKeyEnum.S3);

		this.s3Client = new S3Client({
			credentials: {
				accessKeyId: s3Config.accessKeyId,
				secretAccessKey: s3Config.secretAccessKey,
			},
			region: s3Config.region,
		});

		this.bucketName = s3Config.bucketName;
	}

	async uploadFile(file: Express.Multer.File): Promise<string> {
		const key = `${randomUUID()}${extname(file.originalname)}`;

		const command = new PutObjectCommand({
			Body: file.buffer,
			Bucket: this.bucketName,
			ContentType: file.mimetype,
			Key: key,
		});

		await this.s3Client.send(command);
		return key;
	}

	async getSignedUrl(key: string): Promise<string> {
		const command = new GetObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		return getSignedUrl(this.s3Client, command, {
			expiresIn: 3000,
		});
	}

	async deleteFile(key: string): Promise<void> {
		const command = new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: key,
		});

		await this.s3Client.send(command);
	}

	async generateUploadPresignedUrl(
		fileName: string,
		contentType: string,
	): Promise<{
		url: string;
		key: string;
	}> {
		const key = `${randomUUID()}${extname(fileName)}`;

		const command = new PutObjectCommand({
			Bucket: this.bucketName,
			ContentType: contentType,
			Key: key,
		});

		const url = await getSignedUrl(this.s3Client, command, {
			expiresIn: 300,
		});

		return {
			key,
			url,
		};
	}
}
