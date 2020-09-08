import express = require("express");
import * as service from '../services/login.service';
const router = express.Router();

// POST //
router.post('/', service.login);

export default router;