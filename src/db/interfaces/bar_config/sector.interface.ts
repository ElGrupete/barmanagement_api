import { Document } from "mongoose";

export declare interface ISector extends Document {
    name: string;
    description: string;
    tables: string[];
}