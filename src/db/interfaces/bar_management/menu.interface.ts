import { Document } from 'mongoose';

export declare interface IMenu extends Document {
    name: string;
    description: string;
    categoryId: string;
    productId: string[];
    notes: string;
    image: string;
    statusId: string;
    printed: boolean;
}