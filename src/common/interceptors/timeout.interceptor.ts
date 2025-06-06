import {
	CallHandler,
	ExecutionContext,
	GatewayTimeoutException,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
	constructor(private readonly timeoutInMillis: number) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		return next.handle().pipe(
			timeout(this.timeoutInMillis),
			catchError(e => {
				if (e instanceof TimeoutError) {
					throw new GatewayTimeoutException('Gateway timeout has occured');
				}
				return throwError(() => e);
			}),
		);
	}
}
