import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
import { RESPONSE_MESSAGE_METADATA } from '../decorators/response-message.decorator';
import { Prisma } from '@prisma/client';

export type Response<T> = {
    success: boolean;
    statusCode: number;
    path: string;
    message: string;
    data: T;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    constructor(private reflector: Reflector) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((res: unknown) => this.responseHandler(res, context)),
            catchError((err: any) =>
                throwError(() => this.errorHandler(err, context)),
            ),
        );
    }

    private getPrismaErrorMessage(exception: Prisma.PrismaClientKnownRequestError): string {
        switch (exception.code) {
            case 'P2003':
                return 'Required relationship field is missing';
            case 'P2002':
                return 'A unique constraint would be violated';
            case 'P2025':
                return 'Record not found';
            case 'P2014':
                return 'The change you are trying to make would violate the required relation';
            case 'P2016':
                return 'Query interpretation error';
            case 'P2017':
                return 'The records for the relationship do not exist';
            default:
                return 'Database operation failed';
        }
    }

    errorHandler(exception: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let errorResponse: Response<any>;

        if (exception instanceof Prisma.PrismaClientKnownRequestError) {
            const status = HttpStatus.BAD_REQUEST;
            errorResponse = {
                success: false,
                statusCode: status,
                path: request.url,
                message: this.getPrismaErrorMessage(exception),
                data: {
                    error: 'Database Error',
                    code: exception.code,
                    details: {
                        code: exception.code,
                        meta: exception.meta,
                        target: exception.meta?.target || null
                    }
                }
            };
        } else {
            const status = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

            errorResponse = {
                success: false,
                statusCode: status,
                path: request.url,
                message: exception.message,
                data: {
                    error: exception instanceof HttpException
                        ? exception.getResponse()['error'] || 'Error'
                        : 'Internal Server Error',
                    details: exception instanceof HttpException
                        ? exception.getResponse()
                        : null
                }
            };
        }

        response.status(errorResponse.statusCode).json(errorResponse);
    }

    responseHandler(res: any, context: ExecutionContext) {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = response.statusCode;
        const message =
            this.reflector.get<string>(
                RESPONSE_MESSAGE_METADATA,
                context.getHandler(),
            ) || 'Success';

        return {
            success: true,
            path: request.url,
            message: message,
            statusCode,
            data: res,
        };
    }
}