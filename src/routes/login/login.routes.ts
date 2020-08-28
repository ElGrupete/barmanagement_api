import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { TOKEN_EXP, SECRET } from "../../config/config";
const router = express.Router();

// POST //
router.post('/', (req: Request, res: Response) => {

    let userName = req.body.userName;
    let password = req.body.password;

    DB.Models.User.findOne({ userName }, (err, user) => {
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
});

export default router;