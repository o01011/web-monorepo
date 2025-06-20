// import { ENVIROMENTS } from '@common/enums';
import { LOG_LEVELS } from '@common/enums/log-levels.enum';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format, config } from 'winston';
import 'winston-daily-rotate-file';

@Module({
	imports: [
		WinstonModule.forRootAsync({
			useFactory: async (configService: ConfigService) => {
				// const isDev = configService.getOrThrow<string>('NODE_ENV') === ENVIROMENTS.DEVELOPMENT;
				const logLevel = configService.getOrThrow<number>('LOG_LEVEL');

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
						new transports.DailyRotateFile({
							filename: 'logs/application-%DATE%.log',
							datePattern: 'YYYY-MM-DD',
							zippedArchive: true,
							maxSize: '20m',
							maxFiles: '14d',
							format: format.combine(format.timestamp(), format.json()),
						}),
					],
				};
			},
			inject: [ConfigService],
		}),
	],
})
export class LoggerModule {}
