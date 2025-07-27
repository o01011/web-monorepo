import { LOG_LEVELS } from '@common/enums/log-levels.enum';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { config, format, transports } from 'winston';

@Module({
	imports: [
		WinstonModule.forRootAsync({
			useFactory: async (configService: ConfigService) => {
				const logLevel = configService.get<number>('LOG_LEVEL');

				return {
					levels: config.syslog.levels,

					level: LOG_LEVELS[logLevel],
					transports: [
						new transports.Console({
							format: format.combine(
								format.timestamp(),
								format.ms(),
								format.json(),
								nestWinstonModuleUtilities.format.nestLike('nestjs-boilerplate'),
							),
						}),
					],
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class LoggerModule {}
