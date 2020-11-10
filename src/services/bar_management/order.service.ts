import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createOrder = async (req: Request, res: Response) => {

    let order = new DB.Models.Order({
        menu: req.body.menu,
        combo: req.body.combo,
        table: req.body.table,
        waiter: req.body.waiter,
        status: req.body.status,
        cutlery: req.body.cutlery,
        totalCost: req.body.totalCost,
        paid: req.body.paid,
        notes: req.body.notes
    });

    await order.save((err, order) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el pedido'
            });
        }

        res.json({
            Ok: true,
            Result: { order }
        });
    });

}

export const getAllOrders = (req: Request, res: Response) => {

    let tableId = req.query.tableId != null ? req.query.tableId : null;

    DB.Models.Order
             .find({})
             .populate('menu')
             .populate('combo')
             .populate({ path: 'table', match: { _id: tableId } })
             .populate('waiter')
             .populate('status')
             .exec((err, allOrders) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
                /** This is necessary because mongoose 
                 * does return the entire document with
                 *  a null field if the match does not apply
                 **/
                let orders = (allOrders).filter(x => x.table != null);
        
                res.status(200).json({
                    Ok: true,
                    Result: { orders }
                });
             });

}

export const getOrderById = (req: Request, res: Response) => {

    let orderId = req.params.id;

    DB.Models.Order.findById(orderId)
        .populate('menu')
        .populate('combo')
        .populate('table')
        .populate('waiter')
        .populate('status')
        .exec((err, order) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Pedido no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {order}
        });
    });
}

export const updateOrder = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedOrder = req.body;

    DB.Models.Order
        .findByIdAndUpdate({_id}, updatedOrder, { new: true }, (err, updatedOrder) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el pedido'
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
                Result: { updatedOrder }
            });
        });
}

export const deleteOrder = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Order.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el pedido'
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