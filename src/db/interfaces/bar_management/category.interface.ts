import { Document } from 'mongoose';

export declare interface ICategory extends Document {
    name: string;
    description: string;
}