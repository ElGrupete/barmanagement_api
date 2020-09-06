import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { IProduct } from '../../interfaces/bar_management/product.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface ProductModel extends Model<IProduct> {};

export class Product {

    private _model: Model<IProduct>;

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

        this._model = model<IProduct>('Product', schema);
    }

    get model(): Model<IProduct> {
        return this._model;
    }
}