import { Document } from 'mongoose';

export declare interface INotification extends Document {
    sender: string;
    receiver: string;
    subject: string;
    datetime: Date;
    readed: boolean;
}