import { Document } from 'mongoose';

export declare interface IOrder extends Document {
    menu: string[];
    combo: string[];
    table: string;
    waiter: string;
    status: string;
    cutlery: number;
    totalCost: number;
    paid: boolean;
    notes: string;
}