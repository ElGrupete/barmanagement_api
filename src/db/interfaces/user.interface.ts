import { Document } from 'mongoose';

export declare interface IUser extends Document {
    roleId: string;
    userName: string;
    password: string;
}