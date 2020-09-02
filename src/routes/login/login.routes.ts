import express = require("express");
import * as services from '../../services/login.service';
const router = express.Router();

// POST //
router.post('/', services.login);

export default router;