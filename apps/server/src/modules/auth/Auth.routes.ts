import { Router } from "express";
import { registerUserController } from "./Auth.controller";
import { registerUserSchema } from "./Auth.validator";
import { validateRequest } from "../../middleware/validateRequest";

const router = Router();

router.post("/register", validateRequest(registerUserSchema), registerUserController);

export default router;