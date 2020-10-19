import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { IMenu } from '../../interfaces/bar_management/menu.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface MenuModel extends Model<IMenu> {};

export class Menu {

    private _model: Model<IMenu>;

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
            category: {
                type: Schema.Types.ObjectId, 
                ref: 'Category', 
                required: true
            },
            product: [{
                type: Schema.Types.ObjectId, 
                ref: 'Product'
            }],
            hasSideDishes: {
                type: Boolean,
                required: true
            },
            sideDishes: {
                type: Schema.Types.ObjectId,
                ref: 'Menu'
            },
            notes: {
                type: String
            },
            image: {
                type: String
            },
            status: [{
                type: Schema.Types.ObjectId, 
                ref: 'Status'
            }],
            printed: {
                type: Boolean
            },
            price: {
                type: Schema.Types.Decimal128,
                required: true
            }

        });
   
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IMenu>('Menu', schema);
    }

    get model(): Model<IMenu> {
        return this._model;
    }
}