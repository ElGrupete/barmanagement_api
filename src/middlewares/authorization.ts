import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

let verifyToken = (req: Request, res: Response, next: NextFunction) => {

    let token = req.get('Authorization');

    if (token == undefined) 
        return res
                .status(401)
                .json({
                    Ok: false,
                    Message: '¡Error! Token no proporcionado.'
                });
    
    jwt.verify(token, SECRET, (err, payload) => {
        
        if (err) {
            return res
                    .status(401)
                    .json({
                        Ok: false,
                        Error: err
                    });
        }
        
        next();
    });


}

export default verifyToken;