import { Status, StatusModel } from './models/bar_management/status.model';
import { Category, CategoryModel } from './models/bar_management/category.model';
import { Product, ProductModel } from './models/bar_management/product.model';
import { MONGO_URI } from './../config/config';
import { connect, connection, Connection } from 'mongoose';
import { Dummy, DummyModel } from './models/dummy.model';
import { RoleModel, Role } from './models/bar_config/role.model';
import { UserModel, User } from './models/bar_config/user.model';

// -- Here you should put all the MODELS that the DB is gonna work with -- //

declare interface IModels {
    Category: CategoryModel;
    Dummy: DummyModel;
    Role: RoleModel;
    User: UserModel;
    Product: ProductModel;
    Status: StatusModel;
}


export class DB {

    private static instance: DB;
    private _db: Connection;
    private _models: IModels;

    private constructor() {
        connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        this._db = connection;
        this._db.on('open', this.connected);
        this._db.on('error', this.error);

        this._models = {
            Dummy: new Dummy().model,
            Role: new Role().model,
            User: new User().model,
            Product: new Product().model,
            Category: new Category().model,
            Status: new Status().model
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