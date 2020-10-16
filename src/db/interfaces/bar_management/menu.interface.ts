import { Document } from 'mongoose';
import { IStatus } from './status.interface';
import { IProduct } from './product.interface';

export declare interface IMenu extends Document {
    name: string;
    description: string;
    category: string; /** String that represents the objectId of a CATEGORY */
    product: string[]; /** String array that represents the objectIds of PRODUCTs */
    // notes: string;
    image: string;
    status: string; /** String that represents the objectId of a STATUS */
    printed: boolean;
    price: number;
}