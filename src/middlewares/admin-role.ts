import { Request, Response, NextFunction } from 'express'
import * as jwt from "jsonwebtoken";
import { SECRET } from '../config/config';
import { IRole } from '../db/interfaces/bar_config/role.interface';

let verifyAdminRole = (req: Request, res: Response, next: NextFunction) => {
    let token = req.get('Authorization');

    if (token == undefined) 
        return res
                .status(401)
                .json({
                    Ok: false,
                    Message: '¡Error! Token no proporcionado.'
                });
    // Here it uses a try/catch stmt because of the non-asyncronous approach //
    try {
        // The decoded variable is set as type any so that the role property can be accessed //
        let decoded: any = jwt.verify(token, SECRET);
        // If the admin property in the role object is true, call next();
        if (decoded.role.admin) {
            next();
        } else {
            return res
            .status(401)
            .json({
                Ok: false,
                Message: '¡Error! No posee rol de administrador.'
            });
        }

    } catch (err) {
        if (err) {
            return res
                    .status(401)
                    .json({
                        Ok: false,
                        Error: err
                    });
        }
    }         
}

export default verifyAdminRole;