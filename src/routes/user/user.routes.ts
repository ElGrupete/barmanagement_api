import * as services from './../../services/user.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
const router = express.Router();

// POST //
router.post('/', [ verifyToken ], services.createUser);

export default router;