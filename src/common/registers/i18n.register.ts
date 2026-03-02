import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.ts";
import { LocalizationType } from "../types/localization.type.ts";

export const i18nRegister = registerAs(
  ConfigKeyEnum.I18N,
  (): LocalizationType => {
    return {
      i18nFallbackLanguage: process.env["I18N_FALLBACK_LANGUAGE"] || "",
    };
  },
);
