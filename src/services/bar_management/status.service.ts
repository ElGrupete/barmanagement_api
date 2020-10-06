import { Request, Response } from 'express';
import { DB } from '../../db/db';

export const createStatus = async (req: Request, res: Response) => {

    let status = new DB.Models.Status({
        name: req.body.name,
        description: req.body.description,
        final: req.body.final
    });

    status.save((err, status) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el estado'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { status }
        });
    });

}

export const getAllStatuses = (req: Request, res: Response) => {

    DB.Models.Status.find((err, statuses) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: err 
            });
        }

        if (statuses.length == 0) {
            return res.status(200).json({
                Ok: true,
                Message: 'No se encontraron estados',
            });
        }

        res.status(200).json({
            Ok: true,
            Result: { statuses }
        });
    });

}

export const getStatusById = (req: Request, res: Response) => {
    let id = req.params.id;

    DB.Models.Status
             .findById(id, (err, status) => {
                if (err) {
                    return res.status(500).json({
                        Ok: false,
                        Message: 'Estado no encontrado' 
                    });
                }
        
                res.status(200).json({
                    Ok: true,
                    Result: { status }
                });

             });
}

export const updateStatus = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedStatus = req.body;

    DB.Models.Status
        .findByIdAndUpdate({ _id }, updatedStatus, { new: true } , (err, updatedStatus) => {
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
                Result: { updatedStatus }
            });
        });
}

export const deleteStatus = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Status.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el estado'
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