import { DB } from './../db/db';
import { Request, Response } from 'express';
import { SECRET, TOKEN_EXP } from '../config/config';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response) => {

    let userName = req.body.userName;
    let password = req.body.password;

    DB.Models.User
             .findOne({ userName })
             .populate('role')
             .exec((err, user) => {
                if (err) {
                    return res
                            .status(500)
                            .json({
                                Ok: false,
                                Error: err,
                                Message: 'Error interno'
                            });
                }

                if (!user) {
                    return res
                            .status(400)
                            .json({
                                Ok: false,
                                Message: 'Usuario o contraseña incorrecto'
                            });
                }

                if (!bcryptjs.compareSync(password, user.password)) {
                    return res
                            .status(400)
                            .json({
                                Ok: false,
                                Message: 'Usuario o contraseña incorrecto'
                            });
                }

                let token = jwt.sign({
                    user
                }, SECRET, { expiresIn: TOKEN_EXP });

                return res
                        .json({
                            Ok: true,
                            Result: {
                                token
                            }
                        }); 
    });
}