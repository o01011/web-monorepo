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
	private readonly appRequestTimeout: number;

	constructor(private readonly configService: ConfigService) {
		this.appRequestTimeout = this.configService.get<number>('APP_REQUEST_TIMEOUT');
	}

	intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
		return next.handle().pipe(
			timeout(this.appRequestTimeout),
			catchError(e => {
				if (e instanceof TimeoutError) {
					throw new GatewayTimeoutException('Timeout has occured');
				}
				return throwError(() => e);
			}),
		);
	}
}
