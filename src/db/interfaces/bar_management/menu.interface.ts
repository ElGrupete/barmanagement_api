import { Document } from 'mongoose';

export declare interface IMenu extends Document {
    name: string;
    description: string;
    category: string; /** String that represents the objectId of a CATEGORY */
    product: string[]; /** String array that represents the objectIds of PRODUCTs */
    hasSideDishes: boolean;
    sideDishes: string;
    image: string;
    status: string; /** String that represents the objectId of a STATUS */
    printed: boolean;
    price: number;
}