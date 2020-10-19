import { Schema, model } from 'mongoose';
import { Model } from 'mongoose';
import { IOrder } from '../../interfaces/bar_management/order.interface';
import mongooseUniqueValidator from 'mongoose-unique-validator';

export interface OrderModel extends Model<IOrder> {};

export class Order {

    private _model: Model<IOrder>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            menu: [{
                type: Schema.Types.ObjectId, 
                ref: 'Menu'
            }],
            combo: [{
                type: Schema.Types.ObjectId, 
                ref: 'Combo'
            }],
            table: {
                type: Schema.Types.ObjectId,
                ref: 'Table'
            },
            waiter: {
                type: Schema.Types.ObjectId,
                ref: 'Waiter'
            },
            status: {
                type: Schema.Types.ObjectId,
                ref: 'Status'
            },
            cutlery: {
                type: Number
            },
            totalCost: [{
                type: Number
            }],
            paid: {
                type: Boolean
            }
        });
   
        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IOrder>('Order', schema);
    }

    get model(): Model<IOrder> {
        return this._model;
    }
}