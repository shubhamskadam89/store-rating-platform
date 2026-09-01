import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Wraps every successful response as { data: ... }.
 * Handlers that already return { data, pagination } are passed through untouched.
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<unknown> {
    return next.handle().pipe(
      map((payload) => {
        if (payload && typeof payload === 'object' && 'data' in (payload as object)) {
          return payload;
        }
        return { data: payload };
      }),
    );
  }
}
