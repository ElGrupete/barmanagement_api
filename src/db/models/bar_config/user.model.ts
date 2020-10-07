import { Model, Schema, model } from "mongoose";
import { IUser } from "../../interfaces/bar_config/user.interface";
import  mongooseUniqueValidator  from 'mongoose-unique-validator';

export interface UserModel extends Model<IUser> {};

export class User {

    private _model: Model<IUser>;

    /**
     *
     */
    constructor() {
        const schema = new Schema({
            userName: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String,
                required: true,
            },
            roleId: {
                type: Schema.Types.ObjectId, ref: 'Role', required: true
            }
        });

        // This deletes the password in the response object //
        schema.methods.toJSON = function () {
            let obj = this.toObject();
            delete obj.password;
            return obj;
        }

        // This statment adds a plugin to the schema so that the unique fields don't repeat themselfs //
        schema.plugin(mongooseUniqueValidator);

        this._model = model<IUser>('User', schema);
    }

    get model(): Model<IUser> {
        return this._model;
    }
}