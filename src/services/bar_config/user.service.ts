import express = require("express");
import { Request, Response } from "express";
import * as bcryptjs from 'bcryptjs';
import { DB } from "../../db/db";


// POST //
export const createUser = async (req: Request, res: Response) => {

    let user = new DB.Models.User({
        roleId: req.body.roleId,
        userName: req.body.userName,
        password: bcryptjs.hashSync(req.body.password, 10)
    });

    await user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el usuario'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { user }
        });
    });
}

export const getUsers = (req: Request, res: Response) => {
    DB.Models.User.find()
        .populate('role')
        .exec((err, users) => {
            if (err) {
                return res.status(500).json({
                    Ok: false,
                    Message: err 
                });
            }

            if (users.length == 0) {
                return res.status(200).json({
                    Ok: true,
                    Message: 'No se encontraron resultados',
                });
            }
    
            res.status(200).json({
                Ok: true,
                Result: {
                    users, role: users.role
                }
            });
        });
            
}

export const getUserById = (req: Request, res: Response) => {

    let userId = req.params.id;

    DB.Models.User.findById(userId)
        .populate('role')
        .exec((err, user) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Usuario no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {user, role: user != null ? user.role : null}
        });
    });
}

export const deleteUser = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.User.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el usuario'
                    });
        }
        if (!id) {
            return res
                    .status(404)
                    .json({
                        Ok: false,
                        Message: 'Id no proporcionado'
                    });
        }
        
        res.json({
            Ok: true,
        });
    });
}


