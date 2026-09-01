import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ErrorBody {
  statusCode: number;
  message: string;
  errors?: unknown;
  path: string;
  timestamp: string;
}

/**
 * Single error shape for every failure. See docs/api/README.md.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: unknown;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const payload = exception.getResponse();
      if (typeof payload === 'string') {
        message = payload;
      } else {
        const body = payload as { message?: string | string[]; error?: string };
        if (Array.isArray(body.message)) {
          message = 'Validation failed';
          errors = body.message;
        } else {
          message = body.message ?? body.error ?? message;
        }
      }
    } else {
      this.logger.error(exception instanceof Error ? exception.stack : String(exception));
    }

    const body: ErrorBody = {
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    };
    if (errors) {
      body.errors = errors;
    }

    response.status(status).json(body);
  }
}
