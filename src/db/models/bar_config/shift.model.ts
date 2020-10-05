import { Model, Schema, model } from "mongoose";
import { IShift } from "../../interfaces/bar_config/shift.interface";
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface ShiftModel extends Model<IShift> {};

export class Shift {

    private _model: Model<IShift>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            shift: {
                type: String,
                required: true,
                unique: true
            },
            description: {
                type: String
            }
        });

        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);
        
        this._model = model<IShift>('Shift', schema);
    }

    get model(): Model<IShift> {
        return this._model;
    }
}