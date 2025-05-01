import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPagination() {
    return applyDecorators(
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: 'Page number (starts from 1)',
            example: 1
        }),
        ApiQuery({
            name: 'size',
            required: false,
            type: Number,
            description: 'Number of items per page',
            example: 10
        })
    );
}