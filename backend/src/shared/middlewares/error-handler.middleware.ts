import { AppError } from "../errors/app-error.js";
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
) {
    console.error(error);

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
        success: false,
        message: error.message,
        });
    }

    return response.status(500).json({
        success: false,
        message: 'Internal server error'
    })
}