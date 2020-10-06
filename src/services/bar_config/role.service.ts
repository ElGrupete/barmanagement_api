import { DB } from '../../db/db';
import { Request, Response } from 'express';


export const getRoles = (req: Request, res: Response) => {
    DB.Models.Role.find({}, (err, roles) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: err 
            });
        }

        if (roles.length == 0) {
            return res.status(200).json({
                Ok: true,
                Message: 'No se encontraron resultados',
            });
        }

        res.status(200).json({
            Ok: true,
            Result: {
                roles
            }
        });
    });
}

export const getRoleById = (req: Request, res: Response) => {

    let roleId = req.params.id;

    DB.Models.Role.findById(roleId, (err, role) => {
        if (err) {
            return res.status(500).json({
                Ok: false,
                Message: 'Rol no encontrado' 
            });
        }


        res.status(200).json({
            Ok: true,
            Result: role
        });
    });
}

export const createRole = (req: Request, res: Response) => {

    let role = new DB.Models.Role({
        name: req.body.name,
        description: req.body.description,
        admin: req.body.admin
    });

    role.save( (err, role) => {
        if (err) {
            return res.status(400).json({
                Ok: false,
                Error: err,
                Message: 'No se pudo guardar el rol'
            });
        }

        res.status(200).json({
            Ok: true,
            Result: role
        });
    });
}

export const updateRole = (req: Request, res: Response) => {

    let id = req.params.id;
    let updatedRole = req.body

    DB.Models.Role.updateOne({id}, updatedRole, (err, role) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el usuario'
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

export const deleteRole = (req: Request, res: Response) => {

    let id = req.params.id;

    DB.Models.Role.deleteOne({_id: id}, (err) => {
        if (err) {
            return res
                    .status(500)
                    .json({
                        Ok: false,
                        Error: err,
                        Message: 'No se pudo actualizar el rol'
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