import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { IEnvironment } from "../types/environment.type.ts";

export const environmentRegister = registerAs(
  ConfigKeyEnum.ENVIRONMENT,
  (): IEnvironment => {
    return {
      nodeEnv: String(process.env["NODE_ENV"]),
    };
  },
);
