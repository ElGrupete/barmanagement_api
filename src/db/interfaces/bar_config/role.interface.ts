import { Document } from "mongoose";

export declare interface IRole extends Document {
    name: string;
    description: string;
    admin: boolean;
}