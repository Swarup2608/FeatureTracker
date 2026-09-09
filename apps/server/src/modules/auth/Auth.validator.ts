import { z } from "zod";

export const registerUserSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    password: z.string().min(8).regex(/^(?=.*[A-Z])/, "Must contain uppercase letter").regex(/^(?=.*[a-z])/, "Must contain lowercase letter").regex(/^(?=.*\d)/, "Must contain number")    .regex(/^(?=.*[@$!%*?&])/, "Must contain special character"),
    role: z.enum(["USER", "ADMIN", "ORGANIZATION_ADMIN"]),
    organization: z.string().trim().regex(/^[0-9a-fA-F]{24}$/, "Invalid organization ID").optional()
}).strict();

export type RegisterUserInput = z.infer<typeof registerUserSchema>;