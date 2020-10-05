import { DB } from '../../db/db';
import { Request, Response } from 'express';


export const getShifts = (req: Request, res: Response) => {
    DB.Models.Shift.find({}, (err, shifts) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: err 
            });
        }

        if (shifts.length == 0) {
            return res.status(200).json({
                Ok: true,
                Message: 'No se encontraron resultados',
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {
                shifts
            }
        });
    });
}

export const getShiftById = (req: Request, res: Response) => {

    let shiftId = req.params.id;

    DB.Models.Shift.findById(shiftId, (err, shift) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Shift no encontrado' 
            });
        }


        res.status(200).json({
            Ok: true,
            Result: shift
        });
    });
}

export const createShift = (req: Request, res: Response) => {

    let shift = new DB.Models.Shift({
        shift: req.body.shift,
        description: req.body.description
    });

    shift.save( (err, shift) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el shift'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: shift
        });
    });
}

export const updateShift = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedShift = req.body;

    DB.Models.Shift
        .findByIdAndUpdate({_id}, updatedShift, { new: true }, (err, updatedShift) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el turno'
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
                Result: { updatedShift }
            });
        });
}

export const deleteShift = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Shift.deleteOne({id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el shift'
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
            Message: 'Shift eliminado correctamente'
        });
    });
}