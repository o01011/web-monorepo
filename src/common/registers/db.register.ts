import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { DbType } from "../types/db.type.ts";

export const dbRegister = registerAs(ConfigKeyEnum.DB, (): DbType => {
  return {
    postgresUrl: process.env["POSTGRES_URL"] ?? "",
  };
});
