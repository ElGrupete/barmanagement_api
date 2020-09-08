import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { ICategory } from '../../interfaces/bar_management/category.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface CategoryModel extends Model<ICategory> {};

export class Category {

    private _model: Model<ICategory>;

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
            }
        });
        
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<ICategory>('Category', schema);
    }

    get model(): Model<ICategory> {
        return this._model;
    }
}