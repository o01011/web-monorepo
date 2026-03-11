import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../core/prisma/prisma.service.js";
import { SignUpDto } from "./dtos/sign-up.dto.js";
import { UserRdo } from "./rdos/user.rdo.js";

@Injectable()
export class AuthRepository {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(signUpDto: SignUpDto): Promise<UserRdo> {
		return await this.prismaService.user.create({
			data: signUpDto,
		});
	}

	public async findOneByEmail(email: string): Promise<UserRdo | null> {
		return await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});
	}

	public async findOneById(id: number): Promise<UserRdo | null> {
		return await this.prismaService.user.findUnique({
			where: {
				id,
			},
		});
	}
}
