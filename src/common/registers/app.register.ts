import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { AppType } from "../types/app.type.js";

export const appRegister = registerAs(ConfigKeyEnum.APP, (): AppType => {
  return {
    appPort: Number(process.env["APP_PORT"]) || 0,
    appName: process.env["APP_NAME"] || "",
    appDescription: process.env["APP_DESCRIPTION"] || "",
    appLogLevel: Number(process.env["APP_LOG_LEVEL"]) || 0,
    appRequestTimeout: Number(process.env["APP_REQUEST_TIMEOUT"]) || 0,
  };
});
