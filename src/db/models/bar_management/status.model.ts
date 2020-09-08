import { Model, Schema, model } from 'mongoose';
import { IStatus } from '../../interfaces/bar_management/status.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';


export interface StatusModel extends Model<IStatus> {};

export class Status {

    private _model: Model<IStatus>;
    /**
     *
     */
    constructor() {
        const schema = new Schema({
            name: {
                type: String,
                unique: true,
                required: true
            },
            description: {
                type: String
            },
            final: {
                type: Boolean
            }
        });
        
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IStatus>('Status', schema);
    }

    get model(): Model<IStatus> {
        return this._model;
    }
}