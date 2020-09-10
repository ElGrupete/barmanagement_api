import { Document } from 'mongoose';
import { IStatus } from './status.interface';
import { IProduct } from './product.interface';

export declare interface IMenu extends Document {
    name: string;
    description: string;
    categoryId: string;
    productId: string[];
    products?: IProduct;
  //  garnitureId: string[]; //array de menus o productos
    notes: string;
    image: string;
    statusId: string;
    status?: IStatus;
    printed: boolean;
}