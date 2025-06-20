import {
	CallHandler,
	ExecutionContext,
	GatewayTimeoutException,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	constructor(private readonly configService: ConfigService) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		const appRequestTimeout = this.configService.getOrThrow<number>('APP_REQUEST_TIMEOUT');

		return next.handle().pipe(
			timeout(appRequestTimeout),
			catchError(e => {
				if (e instanceof TimeoutError) {
					throw new GatewayTimeoutException('Gateway timeout has occured');
				}
				return throwError(() => e);
			}),
		);
	}
}
