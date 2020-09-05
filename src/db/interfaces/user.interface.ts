import { Document } from 'mongoose';
import { IRole } from './role.interface';

export declare interface IUser extends Document {
    roleId: string;
    role?: IRole;
    userName: string;
    password: string;
}