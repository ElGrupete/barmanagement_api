import express = require("express");
import { Request, Response } from "express";
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`Success on get method`);
});

export default router;