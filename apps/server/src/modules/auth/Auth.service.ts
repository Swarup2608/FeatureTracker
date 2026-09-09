import User from "../users/User.model";
import Organization from "../organization/Organization.model";
import bcrypt from "bcryptjs";
import { RegisterUserInput, registerUserSchema } from "./Auth.validator";
import { AppError } from "../../utils/AppError";

export const registerUserService = async (userData: RegisterUserInput) => {
        const validatedUserData = registerUserSchema.parse(userData);
        const existingUser = await User.findOne({ email: validatedUserData.email });
        if (existingUser) {
            throw new AppError("[register] User with this email already exists", 409);
        }
        if(validatedUserData.organization){
            const checkOrganization = await Organization.findById(validatedUserData.organization);
            if (!checkOrganization) {
                throw new AppError("[register] Organization not found", 404);
            }
            if(validatedUserData.role === "ADMIN"){
                throw new AppError("[register] User with an organization must not have the role ADMIN", 400);
            }
        }
        const hashedPassword = await bcrypt.hash(validatedUserData.password, 12);
        const newUser = new User({
            ...validatedUserData,
            password: hashedPassword,
            isVerified: false
        });
        await newUser.save();

}