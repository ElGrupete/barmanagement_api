import { Document } from 'mongoose';

export declare interface ITable extends Document {
    sector: string;
    user: string;
    available: boolean;
    people: number;
    booked: boolean;
}