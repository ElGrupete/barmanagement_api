import { Document } from 'mongoose';

export declare interface IWaiter extends Document {
    sector: string;
    user: string;
    shift: string;
    name: string;
    lastname: string;
}