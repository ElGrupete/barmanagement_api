import express = require("express");
import { Request, Response } from "express";
import { DB } from "../../db/db";
const router = express.Router();

// -- GET ALL -- //
router.get('/', (req: Request, res: Response) => {
    DB.Models.Dummy.find({}, (err, dummies) => {
        if (err) {
            return res.status(500).json({err})
        }

        res.status(200).json({ok: true, dummies});
    })
});

// -- POST -- //

router.post('/', (req: Request, res: Response) => {
    let dummy = new DB.Models.Dummy({
        description: req.body.description
    });

    dummy.save((err, dummy) => {
        if (err) {
            return res.status(500).json({err})
        }

        res.status(201).json({ok: true, dummy})
    });
});

export default router;