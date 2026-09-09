import { Request, Response } from "express";
import { registerUserService } from "./Auth.service";
import { AppError } from "../../utils/AppError";
import { ZodError } from "zod";

export const registerUserController = async (req: Request, res: Response) => {
    try {
        await registerUserService(req.body);
        res.status(201).json({
            message : "User successfully registered!"
        });
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            res.status(400).json({
                error: "[register] Invalid request data",
                details: error.flatten().fieldErrors,
            });
            return;
        }

       if (error instanceof AppError) {
            res.status(error.statusCode).json({
                error: error.message,
        });
        return;
       }
       res.status(500).json({
           error: "[register] Internal server error occurred",
       });
   }
}
