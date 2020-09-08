import * as service from '../../services/bar_config/user.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

// POST //
router.post('/', [ verifyToken, verifyAdminRole ], service.createUser);

export default router;