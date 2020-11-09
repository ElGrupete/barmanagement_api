import { Model, Schema, model } from "mongoose";
import { ITable } from "../../interfaces/bar_config/table.interface";
import  mongooseUniqueValidator  from 'mongoose-unique-validator';

export interface TableModel extends Model<ITable> {};

export class Table {

    private _model: Model<ITable>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            number: {
                type: Number,
                required: true,
                unique: true
            },
            sector: {
                type: Schema.Types.ObjectId, 
                ref: 'Sector', 
                // required: true
            },
            user: {
                type: Schema.Types.ObjectId, 
                ref: 'User', 
            },
            available: {
                type: Boolean,
                required: true
            },
            people: {
                type: Number,
                default: 0
            },
            booked: {
                type: Boolean
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

        this._model = model<ITable>('Table', schema);
    }

    get model(): Model<ITable> {
        return this._model;
    }
}