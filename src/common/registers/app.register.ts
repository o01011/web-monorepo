import { ConfigKeyEnum } from '@src/common/enums/config.enum';
import { registerAs } from '@nestjs/config';
import { IAppConfig } from '@src/common/interfaces/app-config.interface';

export const appRegister = registerAs(ConfigKeyEnum.APP, (): IAppConfig => {
  return {
    appPort: Number(process.env.APP_PORT),
    appName: process.env.APP_NAME ?? '',
    appDescription: process.env.APP_DESCRIPTION ?? '',
    appLogLevel: Number(process.env.APP_LOG_LEVEL),
    appRequestTimeout: Number(process.env.APP_REQUEST_TIMEOUT),
  };
});
