import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";

export const createNotification = async (req: Request, res: Response) => {

    let notification = new DB.Models.Notification({
        sender: req.body.sender,
        receiver: req.body.receiver,
        subject: req.body.subject,
        readed: req.body.readed
    });

    await notification.save((err, notification) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el notification'
            });
        }

        res.json({
            Ok: true,
            Result: { notification }
        });
    });

}

export const getAllNotifications = (req: Request, res: Response) => {

    DB.Models.Notification
             .find({})
             .populate('sender')
             .populate('receiver')
             .exec((err, notifications) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: err 
                    });
                }
        
                if (notifications.length == 0) {
                    return res.status(200).json({
                        Ok: true,
                        Message: 'No se encontraron resultados',
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { notifications }
                });
             });

}

export const getNotificationById = (req: Request, res: Response) => {

    let notificationId = req.params.id;

    DB.Models.Notification.findById(notificationId)
        .populate('sender')
        .populate('receiver')
        .exec((err, notification) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Mozo no encontrado' 
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {notification}
        });
    });
}

export const updateNotification = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedNotification = req.body;

    DB.Models.Notification
        .findByIdAndUpdate({_id}, updatedNotification, { new: true }, (err, updatedNotification) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el notification'
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
                Result: { updatedNotification }
            });
        });
}

export const deleteNotification = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Notification.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el notification'
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