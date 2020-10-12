import { Document } from 'mongoose';
import { ISector } from './sector.interface';
import { IShift } from './shift.interface';
import { IUser } from './user.interface';

export declare interface IWaiter extends Document {
    sector: ISector;
    user: IUser;
    shift: IShift;
    name: string;
    lastname: string;
}