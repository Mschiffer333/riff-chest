import type { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from 'zod';

export function validate(schema: ZodTypeAny) {
    return (request: Request, response: Response, next: NextFunction) => {
        const result = schema.safeParse(request.body);

        if(!result.success){
            return response.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: result.error.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message
                })),
            });
        }

        request.body = result.data;

        next();
    }
}