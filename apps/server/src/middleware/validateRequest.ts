import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

export const validateRequest = (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                throw new AppError("[validateRequest] Invalid request data "+ error.flatten().fieldErrors, 400, );
            }
            res.status(500).json({
                error: "Internal server error occurred",
            });
        }
    };
};