import { MONGO_URI } from './../config/config';
import { connect, connection, Connection } from 'mongoose';
import { Dummy, DummyModel } from './models/dummy.model';
import { RoleModel, Role } from './models/role.model';
import { UserModel, User } from './models/user.model';

// -- Here you should put all the MODELS that the DB is gonna work with -- //

declare interface IModels {
    Dummy: DummyModel,
    Role: RoleModel,
    User: UserModel,
}


export class DB {

    private static instance: DB;
    private _db: Connection;
    private _models: IModels;

    private constructor() {
        connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        this._db = connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);

        this._models = {
            Dummy: new Dummy().model,
            Role: new Role().model,
            User: new User().model
        }
    }

    static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }

        return DB.instance._models;
    }

    private connected() {
        console.log(`MongoDB's been connected SUCCESSFULLY`);
    }

    private error() {
        console.log(`There's been an ERROR connecting to MongoDB`);
    }

}