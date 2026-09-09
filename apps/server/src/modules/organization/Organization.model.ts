import mongoose, { Schema, Document } from "mongoose";

export const ORGANIZATION_SIZES = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
] as const;

export const ORGANIZATION_INDUSTRIES = [
    "TECHNOLOGY",
    "FINANCE",
    "HEALTHCARE",
    "EDUCATION",
    "RETAIL",
    "MANUFACTURING",
    "OTHER",
] as const;

export type OrganizationIndustry = typeof ORGANIZATION_INDUSTRIES[number];

export type OrganizationSize = typeof ORGANIZATION_SIZES[number];

export interface IOrganization extends Document {
    organization: string;
    organizationDescription: string;
    organizationWebsite: string;
    organizationEmail: string;
    organizationPhone: string;
    organizationIndustry: OrganizationIndustry;
    organizationSize: OrganizationSize;
    organizationFounded: Date;
    organizationEmployees: number;
    organizationRevenue: { amount: number; currency: string };
    organizationMission: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrganizationSchema = new Schema<IOrganization>({
    organization: { type: String, required: true, unique: true, trim: true, minlength: 3, maxlength: 100 },
    organizationDescription: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
    organizationWebsite: { type: String, required: true , trim: true, lowercase: true, minlength: 5, maxlength: 100 },
    organizationEmail: { type: String, required: true, trim: true, lowercase: true, minlength: 5, maxlength: 100, match: /^[^\s@]+\.[^\s@]+$/, },
    organizationPhone: { type: String, required: true, trim: true, minlength: 10, maxlength: 15 },
    organizationIndustry: { type: String, required: true, enum: ORGANIZATION_INDUSTRIES },
    organizationSize: { type: String, required: true, enum: ORGANIZATION_SIZES },
    organizationFounded: { type: Date, required: true },
    organizationEmployees: { type: Number, required: true, min: 1 },
    organizationRevenue: { amount: { type: Number, required: true, min: 0 }, currency: { type: String, uppercase: true, required: true, trim: true, minlength: 3, maxlength: 3 } },
    organizationMission: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
}, { timestamps: true });

const Organization = mongoose.model<IOrganization>("Organization", OrganizationSchema);
export default Organization;