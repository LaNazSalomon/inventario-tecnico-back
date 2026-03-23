import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AppLogger } from './app-logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(AppLogger) private logger: AppLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        typeof message === 'object'
          ? (message as any).message || message
          : message,
    };

    const errorLog = `${request.method} ${request.url} - Status: ${status} - Error: ${JSON.stringify(errorResponse)}`;

    if (status >= 500) {
      this.logger.error(
        errorLog,
        exception instanceof Error ? exception.stack : undefined,
        'Exception',
      );
    } else {
      this.logger.warn(errorLog, 'HTTP');
    }

    response.status(status).json(errorResponse);
  }
}
