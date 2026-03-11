import { registerAs } from "@nestjs/config";
import { ConfigKeyEnum } from "../enums/config.enum.js";
import type { LocalizationType } from "../types/localization.type.js";

export const i18nRegister = registerAs(ConfigKeyEnum.I18N, (): LocalizationType => {
	return {
		i18nFallbackLanguage: process.env.I18N_FALLBACK_LANGUAGE || "",
	};
});
