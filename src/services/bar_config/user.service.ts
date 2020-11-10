import express = require("express");
import { Request, Response } from "express";
import * as bcryptjs from 'bcryptjs';
import { DB } from "../../db/db";
import * as waiterMethods from '../bar_config/waiter.service';
import * as tableMethods from '../bar_config/table.service';


// POST //
export const createUser = async (req: Request, res: Response) => {

    let user = new DB.Models.User({
        role: req.body.role,
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

        DB.Models.Role.findById({ _id: req.body.role })
                      .exec(async (err, role) => {

                        if (err) {
                            return res.status(404).json({
                                Ok: false,
                                Error: err,
                                Message: 'No se encontró el rol'
                            });
                        }

                        if (role != null && role.name == 'Mesa') {
                            await tableMethods.createTableFromUserCreation(req, res, user._id);
                        }

                        if (role != null && role.name == 'Camarero') {
                            await waiterMethods.createWaiterFromUserCreation(req, res, user._id);
                        }
                    });


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
                    users
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
            Result: {user}
        });
    });
}

export const deleteUser = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.User.deleteOne({ _id: id }, (err) => {
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


