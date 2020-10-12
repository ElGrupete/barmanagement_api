import { Document } from 'mongoose';
import { ISector } from './sector.interface';
import { IUser } from './user.interface';

export declare interface ITable extends Document {
    sector: ISector;
    user: IUser;
    available: boolean;
    people: number;
    booked: boolean;
}