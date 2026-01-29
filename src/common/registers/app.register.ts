import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { IAppConfig } from "../interfaces/app-config.interface.js";

export const appRegister = registerAs(ConfigKeyEnum.APP, (): IAppConfig => {
  return {
    appPort: Number(process.env["APP_PORT"]),
    appName: process.env["APP_NAME"] ?? "",
    appDescription: process.env["APP_DESCRIPTION"] ?? "",
    appLogLevel: Number(process.env["APP_LOG_LEVEL"]),
    appRequestTimeout: Number(process.env["APP_REQUEST_TIMEOUT"]),
  };
});
