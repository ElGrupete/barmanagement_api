import { Document } from 'mongoose';

export declare interface IUser extends Document {
    role: string;
    userName: string;
    password: string;
}