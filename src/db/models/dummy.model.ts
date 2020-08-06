import { Model, Schema, model } from 'mongoose';
import { IDummy } from '../interfaces/dummy.interface';

export interface DummyModel extends Model<IDummy> {};

export class Dummy {

    private _model: Model<IDummy>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            description: {
                type: String,
                required: true
            }
        });

        this._model = model<IDummy>('Dummy', schema);
    }

    get model(): Model<IDummy> {
        return this._model;
    }
}