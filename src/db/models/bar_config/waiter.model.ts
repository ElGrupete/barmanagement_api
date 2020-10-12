import { Model, Schema, model } from "mongoose";
import { IWaiter } from "../../interfaces/bar_config/waiter.interface";
import  mongooseUniqueValidator  from 'mongoose-unique-validator';

export interface WaiterModel extends Model<IWaiter> {};

export class Waiter {

    private _model: Model<IWaiter>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            sector: {
                type: Schema.Types.ObjectId, 
                ref: 'Sector', 
                required: true
            },
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User', 
                required: true
            },
            shift: {
                type: Schema.Types.ObjectId, 
                ref: 'Shift', 
                required: true
            },
            name: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            }
        });

        // This deletes the password in the response object //
        schema.methods.toJSON = function () {
            let obj = this.toObject();
            delete obj.password;
            return obj;
        }

        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IWaiter>('Waiter', schema);
    }

    get model(): Model<IWaiter> {
        return this._model;
    }
}