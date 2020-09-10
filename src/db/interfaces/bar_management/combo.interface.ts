import { Document } from 'mongoose';
import { IMenu } from './menu.interface';

export declare interface ICombo extends Document {
    name: string;
    description: string;
    menuId: string[];
    menus?: IMenu;
    expirationDate: Date;
    image: string;
}