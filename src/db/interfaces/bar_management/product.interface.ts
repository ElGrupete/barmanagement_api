import { Document } from 'mongoose';

export declare interface IProduct extends Document {
    name: string;
    description: string;
}