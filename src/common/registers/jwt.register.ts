import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import { JwtType } from "../types/jwt.type.js";

export const jwtRegister = registerAs(ConfigKeyEnum.JWT, (): JwtType => {
  return {
    secret: process.env["JWT_SECRET"] || "",
    expiresIn: Number(process.env["JWT_EXPIRES_IN"]) || 0,
  };
});
