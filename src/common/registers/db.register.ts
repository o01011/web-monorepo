import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { DbType } from "../types/db.type.js";

export const dbRegister = registerAs(ConfigKeyEnum.DB, (): DbType => {
  return {
    postgresUrl: process.env["POSTGRES_URL"] || "",
  };
});
