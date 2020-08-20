import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";
import * as bcryptjs from 'bcryptjs';
import verifyToken from "../../middlewares/authorization";
const router = express.Router();

// POST //
router.post('/', [ verifyToken ], (req: Request, res: Response) => {
    let user = new DB.Models.User({
        roleId: req.body.roleId,
        userName: req.body.userName,
        password: bcryptjs.hashSync(req.body.password, 10)
    });

    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el usuario'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: user.userName
        });
    });
});

export default router;