import express = require("express");
import { Request, Response } from "express";
import * as bcryptjs from 'bcryptjs';
import { DB } from "../../db/db";


// POST //
export const createWaiter = async (req: Request, res: Response) => {

    let waiter = new DB.Models.Waiter({
        sector: req.body.sector,
        shift: req.body.shift,
        user: req.body.user,
        name: req.body.name,
        lastname: req.body.lastname
    });

    await waiter.save((err, waiter) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el camarero'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { waiter }
        });
    });
}

export const getWaiters = (req: Request, res: Response) => {

    DB.Models.Waiter.find()
        .populate('sector').populate('user').populate('shift')
        .exec((err, waiters) => {
            if (err) {
                return res.status(500).json({
                    Ok: false,
                    Message: err 
                });
            }

            if (waiters.length == 0) {
                return res.status(200).json({
                    Ok: true,
                    Message: 'No se encontraron resultados',
                });
            }
    
            res.status(200).json({
                Ok: true,
                Result: {
                    waiters
                }
            });
        });
            
}

export const getWaiterById = (req: Request, res: Response) => {

    let waiterId = req.params.id;

    DB.Models.Waiter.findById(waiterId)
        .populate('sector').populate('user').populate('shift')
        .exec((err, waiter) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Mozo no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {waiter}
        });
    });
}

export const updateWaiter = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedWaiter = req.body;

    DB.Models.Waiter
        .findByIdAndUpdate({_id}, updatedWaiter, { new: true }, (err, updatedWaiter) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el camarero'
                        });
            }
            if (!_id) {
                return res
                        .status(404)
                        .json({
                            Ok: false,
                            Message: 'Id no proporcionado'
                        });
            }
            
            res.json({
                Ok: true,
                Result: { updatedWaiter }
            });
        });
}

export const deleteWaiter = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Waiter.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el camarero'
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


