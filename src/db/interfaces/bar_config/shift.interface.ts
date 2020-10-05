import { Document } from "mongoose";

export declare interface IShift extends Document {
    shift: string;
    description: string;
}