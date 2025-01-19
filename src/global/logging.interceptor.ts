import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Logger } from '@nestjs/common';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('HTTP');
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url } = request;
  
      const startTime = Date.now();
  
      this.logger.log(`Incoming Request: ${method} ${url}`);
  
      return next.handle().pipe(
        tap(() => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const elapsedTime = Date.now() - startTime;
  
          this.logger.log(
            `Response: ${method} ${url} - Status: ${statusCode} - Time: ${elapsedTime}ms`,
          );
        }),
      );
    }
  }
  