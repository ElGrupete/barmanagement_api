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
            categoryId: {
                type: String,
                required: true
            },
            productId: {
                type: [String],
            },
            notes: {
                type: String
            },
            image: {
                type: String
            },
            statusId: {
                type: String
            },
            printed: {
                type: Boolean
            }

        }, { toJSON: { virtuals: true }});

        schema.virtual('products', {
            ref: 'Product',
            localField: 'productId',
            foreignField: '_id'
        })

        schema.virtual('status', {
            ref: 'Status',
            localField: 'statusId',
            foreignField: '_id',
            justOne: true
        })
        
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IMenu>('Menu', schema);
    }

    get model(): Model<IMenu> {
        return this._model;
    }
}