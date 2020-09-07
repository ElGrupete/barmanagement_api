import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createProduct = async (req: Request, res: Response) => {

    let product = new DB.Models.Product({
        name: req.body.name,
        description: req.body.description
    });

    await product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el producto'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { product }
        });
    });
}

export const getAllProducts = (req: Request, res: Response) => {

    DB.Models.Product
             .find({}, (err, products) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
        
                if (products.length == 0) {
                    return res.status(200).json({
                        Ok: true,
                        Message: 'No se encontraron resultados',
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { products }
                });
             });

}

export const getProductById = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Product
             .findById(id, (err, product) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: 'Producto no encontrado' 
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { product }
                });

             });
}

export const updateProduct = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedProduct = req.body;

    DB.Models.Product
        .findByIdAndUpdate({_id}, updatedProduct, { new: true }, (err, updatedProduct) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el producto'
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
                Result: { updatedProduct }
            });
        });
}