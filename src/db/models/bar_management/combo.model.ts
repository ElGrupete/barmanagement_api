import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { ICombo } from '../../interfaces/bar_management/combo.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface ComboModel extends Model<ICombo> {};

export class Combo {

    private _model: Model<ICombo>;

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
            menuId: {
                type: String,
                required: true
            },
            expirationDate: {
                type: Date
            },
            image: {
                type: String
            }
        });

        schema.virtual('menus', {
            ref: 'Menu',
            localField: 'menuId',
            foreignField: '_id'
        })
        
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<ICombo>('Combo', schema);
    }

    get model(): Model<ICombo> {
        return this._model;
    }
}