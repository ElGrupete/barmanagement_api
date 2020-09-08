import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createMenu = async (req: Request, res: Response) => {

    let productIds = req.body.productId.split(",");

    let menu = new DB.Models.Menu({
        name: req.body.name,
        description: req.body.description,
        categoryId: req.body.categoryId,
        notes: req.body.notes,
        image: req.body.image,
        productId: productIds,
        statusId: req.body.statusId,
        printed: req.body.printed
    });

    await menu.save((err, menu) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el menu'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { menu }
        });
    });


    // DB.Models.Menu.update(menu, {$push: { productId: {
    //     $each: [productIds]
    // }  }},{safe: true, upsert: true}, (err, menu) => {
    //     if(err){
    //         return res.status(500).json({
    //             Ok: false,
    //             Message: err
    //         });
    //     }

    //     res.json({
    //         Ok: true,
    //         Result: {menu}
    //     })
    // });

    
}

export const getAllMenus = (req: Request, res: Response) => {

    DB.Models.Menu
             .find({}, (err, menus) => {
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

    let id = req.params.id;

    DB.Models.Menu
             .findById(id, (err, menu) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: 'Menu no encontrado' 
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { menu }
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