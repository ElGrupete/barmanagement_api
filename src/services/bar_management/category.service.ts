import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createCategory = async (req: Request, res: Response) => {

    let category = new DB.Models.Category({
        name: req.body.name,
        description: req.body.description
    });

    await category.save((err, category) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar la categoría'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { category }
        });
    });
}

export const getAllCategories = (req: Request, res: Response) => {

    DB.Models.Category
             .find({}, (err, categories) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
        
                if (categories.length == 0) {
                    return res.status(204).json({
                        Ok: true,
                        Message: 'No se encontraron resultados',
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { categories }
                });
             });

}

export const getCategoryById = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Category
             .findById(id, (err, category) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: 'Categoryo no encontrado' 
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { category }
                });

             });
}

export const updateCategory = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedCategory = req.body;

    DB.Models.Category
        .findByIdAndUpdate({_id}, updatedCategory, { new: true }, (err, updatedCategory) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el categoryo'
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
                Result: { updatedCategory }
            });
        });
}

export const deleteCategory = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Category.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar la categoría'
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