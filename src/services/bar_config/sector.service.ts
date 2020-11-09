import { DB } from '../../db/db';
import { Request, Response } from 'express';


export const getSectors = (req: Request, res: Response) => {
    DB.Models.Sector.find({})
                    .populate('tables')
                    .exec((err, sectors) => {
                        if (err) {
                            return res.status(500).json({
                                Ok: false,
                                Message: err 
                            });
                        }

                        res.status(200).json({
                            Ok: true,
                            Result: {
                                sectors
                            }
                        });
                    });
}

export const getSectorById = (req: Request, res: Response) => {

    let sectorId = req.params.id;

    DB.Models.Sector.findById(sectorId, (err, sector) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Sector no encontrado' 
            });
        }


        res.status(200).json({
            Ok: true,
            Result: sector
        });
    });
}

export const createSector = (req: Request, res: Response) => {

    let sector = new DB.Models.Sector({
        name: req.body.name,
        description: req.body.description,
        tables: req.body.tables
    });

    sector.save( (err, sector) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el sector'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: sector
        });
    });
}

export const updateSector = (req: Request, res: Response) => {
    let _id = req.params.id;
    let updatedSector = req.body;

    DB.Models.Sector
        .findByIdAndUpdate({_id}, updatedSector, { new: true }, (err, updatedSector) => {
            if (err) {
                return res
                        .status(500)
                        .json({
                            Ok: false,
                            Error: err,
                            Message: 'No se pudo actualizar el sector'
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
                Result: { updatedSector }
            });
        });
}

export const deleteSector = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Sector.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el sector'
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