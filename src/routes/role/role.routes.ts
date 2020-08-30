import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";
const router = express.Router();

// GET ALL //
router.get('/', (req: Request, res: Response) => {
    DB.Models.Role.find({}, (err, roles) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: err 
            });
        }

        if (roles.length == 0) {
            return res.status(200).json({
                Ok: true,
                Message: 'No se encontraron resultados',
                Result: roles
            });
        }

        res.status(200).json({
            Ok: true,
            Result: roles
        });
    });
});

// GET ONE //
router.get('/:id', (req: Request, res: Response) => {

    let roleId = req.params.id;

    DB.Models.Role.findById(roleId, (err, role) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Rol no encontrado' 
            });
        }


        res.status(200).json({
            Ok: true,
            Result: role
        });
    });
});

// POST //
router.post('/', (req: Request, res: Response) => {

    let role = new DB.Models.Role({
        name: req.body.name,
        description: req.body.description,
        admin: req.body.admin
    });

    role.save( (err, role) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el rol'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: role
        });
    });
});

export default router;
