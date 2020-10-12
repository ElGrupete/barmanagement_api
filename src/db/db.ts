import { Status, StatusModel } from './models/bar_management/status.model';
import { Category, CategoryModel } from './models/bar_management/category.model';
import { Product, ProductModel } from './models/bar_management/product.model';
import { MONGO_URI } from './../config/config';
import { connect, connection, Connection } from 'mongoose';
import { Dummy, DummyModel } from './models/dummy.model';
import { RoleModel, Role } from './models/bar_config/role.model';
import { UserModel, User } from './models/bar_config/user.model';
import { Menu, MenuModel } from './models/bar_management/menu.model';
import { Combo, ComboModel } from './models/bar_management/combo.model';
import { Sector, SectorModel } from './models/bar_config/sector.model';
import { Shift, ShiftModel } from './models/bar_config/shift.model';
import { Waiter, WaiterModel } from './models/bar_config/waiter.model';
import { Table,TableModel } from './models/bar_config/table.model';

// -- Here you should put all the MODELS that the DB is gonna work with -- //

declare interface IModels {
    Category: CategoryModel;
    Dummy: DummyModel;
    Role: RoleModel;
    User: UserModel;
    Product: ProductModel;
    Menu: MenuModel;
    Status: StatusModel;
    Combo: ComboModel;
    Sector: SectorModel;
    Shift: ShiftModel;
    Waiter: WaiterModel;
    Table: TableModel;
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
            Menu: new Menu().model,
            Status: new Status().model,
            Combo: new Combo().model,
            Sector: new Sector().model,
            Shift: new Shift().model,
            Waiter: new Waiter().model,
            Table: new Table().model
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