import { Module } from '@nestjs/common';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format } from 'winston';
import 'winston-daily-rotate-file';

@Module({
	imports: [
		WinstonModule.forRoot({
			transports: [
				new transports.Console({
					format: format.combine(
						format.timestamp(),
						format.ms(),
						nestWinstonModuleUtilities.format.nestLike('nestjs-boilerplate', {
							colors: true,
							prettyPrint: true,
							processId: true,
							appName: true,
						}),
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
		}),
	],
})
export class LoggerModule {}
