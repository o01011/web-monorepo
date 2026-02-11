import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { AppConfigType } from "../types/app.type.ts";

export const appRegister = registerAs(ConfigKeyEnum.APP, (): AppConfigType => {
  return {
    appPort: Number(process.env["APP_PORT"]) ?? 0,
    appName: process.env["APP_NAME"] ?? "",
    appDescription: process.env["APP_DESCRIPTION"] ?? "",
    appLogLevel: Number(process.env["APP_LOG_LEVEL"]) ?? 0,
    appRequestTimeout: Number(process.env["APP_REQUEST_TIMEOUT"]) ?? 5000,
  };
});
