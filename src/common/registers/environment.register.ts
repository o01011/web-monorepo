import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { EnvironmentType } from "../types/environment.type.ts";

export const environmentRegister = registerAs(
  ConfigKeyEnum.ENVIRONMENT,
  (): EnvironmentType => {
    return {
      nodeEnv: process.env["NODE_ENV"] || "",
    };
  },
);
