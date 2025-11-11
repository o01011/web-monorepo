import { ConfigKeyEnum } from '@libs/common/enums';
import { registerAs } from '@nestjs/config';
import { IAppConfig } from '../interfaces';

export const appConfig = registerAs(ConfigKeyEnum.App, (): IAppConfig => {
	return {
		appPort: Number(process.env.APP_PORT),
		appName: process.env.APP_NAME,
		appDescription: process.env.APP_DESCRIPTION,
		appLogLevel: Number(process.env.APP_LOG_LEVEL),
		appRequestTimeout: Number(process.env.APP_REQUEST_TIMEOUT),
	};
});
