import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";
const router = express.Router();

// POST //
router.post('/', (req: Request, res: Response) => {
    let user = new DB.Models.User({
        roleId: req.body.roleId,
        userName: req.body.userName,
        password: req.body.password
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
            Result: user
        });
    });
});

export default router;