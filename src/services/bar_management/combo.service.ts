import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createCombo = async (req: Request, res: Response) => {

    let combo = new DB.Models.Combo({
        name: req.body.name,
        description: req.body.description
    });

    await combo.save((err, combo) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el comboo'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { combo }
        });
    });
}

export const getAllCombos = (req: Request, res: Response) => {

    DB.Models.Combo
             .find({}, (err, combos) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
        
                if (combos.length == 0) {
                    return res.status(200).json({
                        Ok: true,
                        Message: 'No se encontraron resultados',
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { combos }
                });
             });

}

export const getComboById = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Combo
             .findById(id, (err, combo) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: 'Comboo no encontrado' 
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { combo }
                });

             });
}

export const updateCombo = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedCombo = req.body;

    DB.Models.Combo
        .findByIdAndUpdate({_id}, updatedCombo, { new: true }, (err, updatedCombo) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el comboo'
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
                Result: { updatedCombo }
            });
        });
}