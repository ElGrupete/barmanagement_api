import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";


// POST //
export const createTable = async (req: Request, res: Response) => {

    let table = new DB.Models.Table({
        number: req.body.number,
        sector: req.body.sector,
        user: req.body.user,
        available: req.body.available,
        people: req.body.people,
        booked: req.body.booked
    });

    await table.save((err, table) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el mesa'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { table }
        });
    });
}

export const createTableFromUserCreation = async (req: Request, res: Response, userId?: string) => {

    let table = new DB.Models.Table({
        number: req.body.number,
        sector: req.body.sector,
        user: userId != undefined ? userId : req.body.user,
        available: req.body.available,
        people: req.body.people,
        booked: req.body.booked
    });

    await table.save((err, table) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el mesa'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { table }
        });
    });
}

export const getTables = (req: Request, res: Response) => {

    DB.Models.Table.find()
        .populate('sector')
        .populate('user')
        .exec((err, tables) => {
            if (err) {
                return res.status(500).json({
                    Ok: false,
                    Message: err 
                });
            }
    
            res.status(200).json({
                Ok: true,
                Result: {
                    tables
                }
            });
        });
            
}

export const getTableById = (req: Request, res: Response) => {

    let tableId = req.params.id;

    DB.Models.Table.findById(tableId)
        .populate('sector').populate('user')
        .exec((err, table) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Mozo no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {table}
        });
    });
}

export const updateTable = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedTable = req.body;

    DB.Models.Table
        .findByIdAndUpdate({_id}, updatedTable, { new: true }, (err, updatedTable) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el mesa'
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
                Result: { updatedTable }
            });
        });
}

export const deleteTable = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Table.deleteOne({ _id: id }, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el mesa'
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


