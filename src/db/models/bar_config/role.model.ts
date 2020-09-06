import { Model, Schema, model } from "mongoose";
import { IRole } from "../../interfaces/bar_config/role.interface";
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface RoleModel extends Model<IRole> {};

export class Role {

    private _model: Model<IRole>;

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
            },
            admin: {
                type: Boolean,
                required: true
            }
        });

        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);
        
        this._model = model<IRole>('Role', schema);
    }

    get model(): Model<IRole> {
        return this._model;
    }
}