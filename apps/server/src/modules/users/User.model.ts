import mongoose, { Document, Schema, Types } from "mongoose";

export const USER_ROLES = [
    "USER",
    "ADMIN",
    "ORGANIZATION_ADMIN",
] as const;

export type UserRole = typeof USER_ROLES[number];

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    organization?: Types.ObjectId;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, maxlength: 254, match: /^[^\s@]+\.[^\s@]+$/,},
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, enum: USER_ROLES, required: true },
    isVerified: { type: Boolean, default: false },
    organization: { type: Schema.Types.ObjectId, ref: "Organization" }
},{
    timestamps: true
});

UserSchema.index({ organization: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: 1 });

const User = mongoose.model<IUser>("User", UserSchema);
export default User;