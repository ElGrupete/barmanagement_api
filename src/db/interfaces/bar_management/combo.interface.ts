import { Document } from 'mongoose';

export declare interface ICombo extends Document {
    name: string;
    description: string;
    menu: string[];
    expirationDate: Date;
    image: string;
    price: number;
}