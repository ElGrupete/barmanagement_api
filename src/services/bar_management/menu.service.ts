import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createMenu = async (req: Request, res: Response) => {

    let menu = new DB.Models.Menu({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        hasSideDishes: req.body.hasSideDishes,
        sideDishes: req.body.sideDishes,
        notes: req.body.notes,
        image: req.body.image,
        status: req.body.status,
        printed: req.body.printed,
        product: req.body.product,
        price: req.body.price
    });

    await menu.save((err, menu) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el menu'
            });
        }

        res.json({
            Ok: true,
            Result: { menu }
        });
    });

}

export const getAllMenus = (req: Request, res: Response) => {

    DB.Models.Menu
             .find({})
             .populate('category')
             .populate('product')
             .populate('status')
             .populate({
                path: 'sideDishes',
                populate: { path: "product"}
             })
             .exec((err, menus) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
        
                if (menus.length == 0) {
                    return res.status(200).json({
                        Ok: true,
                        Message: 'No se encontraron resultados',
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { menus }
                });
             });

}

export const getMenuById = (req: Request, res: Response) => {

    let menuId = req.params.id;

    DB.Models.Menu.findById(menuId)
        .populate('category')
        .populate('product')
        .populate('status')
        .populate({
            path: 'sideDishes',
            populate: { path: "product"}
        })
        .exec((err, menu) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Mozo no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {menu}
        });
    });
}

export const updateMenu = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedMenu = req.body;

    DB.Models.Menu
        .findByIdAndUpdate({_id}, updatedMenu, { new: true }, (err, updatedMenu) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el menu'
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
                Result: { updatedMenu }
            });
        });
}

export const deleteMenu = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Menu.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el menu'
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