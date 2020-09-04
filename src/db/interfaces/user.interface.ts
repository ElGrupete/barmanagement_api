import { Document } from 'mongoose';
import { IRole } from './role.interface';

export declare interface IUser extends Document {
    role: IRole['_id'];
    userName: string;
    password: string;
}