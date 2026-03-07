import {
  CallHandler,
  ExecutionContext,
  GatewayTimeoutException,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from "rxjs";
import { ConfigKeyEnum } from "../enums/config.enum.js";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly appRequestTimeout: number;

  constructor(private readonly configService: ConfigService) {
    this.appRequestTimeout = Number(
      this.configService.getOrThrow<number>(
        `${ConfigKeyEnum.APP}.appRequestTimeout`,
      ),
    );
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
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
