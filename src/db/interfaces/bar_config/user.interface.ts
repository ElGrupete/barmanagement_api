import { Document } from 'mongoose';
import { IRole } from './role.interface';

export declare interface IUser extends Document {
    role: IRole;
    userName: string;
    password: string;
}