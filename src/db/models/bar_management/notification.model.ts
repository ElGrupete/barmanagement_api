import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { INotification } from '../../interfaces/bar_management/notification.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { timeStamp } from 'console';

export interface NotificationModel extends Model<INotification> {};

export class Notification {

    private _model: Model<INotification>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            sender: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            receiver: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            subject: {
                string: String,
                required: true
            },
            datetime: {
                type: timeStamp
            },
            readed: {
                type: Boolean,
                required: true
            }

        });
   
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<INotification>('Notification', schema);
    }

    get model(): Model<INotification> {
        return this._model;
    }
}