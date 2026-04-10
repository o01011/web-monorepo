import { type CallHandler, type ExecutionContext, GatewayTimeoutException, Inject, Injectable, type NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { catchError, type Observable, TimeoutError, throwError, timeout } from "rxjs";
import { ConfigKeysConst } from "../constants/config-keys.const.js";
import { AppType } from "../types/app.type.js";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	private readonly appRequestTimeout: number;

	constructor(@Inject(ConfigService) private readonly configService: ConfigService) {
		const appConfig = this.configService.getOrThrow<AppType>(ConfigKeysConst.APP);

		this.appRequestTimeout = appConfig.appRequestTimeout;
	}

	intercept(_context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
		return next.handle().pipe(
			timeout(this.appRequestTimeout),
			catchError((e) => {
				if (e instanceof TimeoutError) {
					throw new GatewayTimeoutException("Timeout has occured");
				}
				return throwError(() => e);
			}),
		);
	}
}
