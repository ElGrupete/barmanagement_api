import { Model, Schema, model } from "mongoose";
import { ISector } from "../../interfaces/bar_config/sector.interface";
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface SectorModel extends Model<ISector> {};

export class Sector {

    private _model: Model<ISector>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            name: {
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
        
        this._model = model<ISector>('Sector', schema);
    }

    get model(): Model<ISector> {
        return this._model;
    }
}