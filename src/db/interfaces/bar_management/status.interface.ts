import { Document } from 'mongoose';


export declare interface IStatus extends Document {
    name: string;
    description: string;
    final: boolean;
}