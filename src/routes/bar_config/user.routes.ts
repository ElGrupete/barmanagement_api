import * as service from '../../services/bar_config/user.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
import verifyAdminUser from '../../middlewares/admin-role';
const router = express.Router();

// POST //
router.post('/', [ verifyToken, verifyAdminUser ], service.createUser);

// GET ALL //
router.get('/', [ verifyToken, verifyAdminUser ], service.getUsers);

// GET ONE //
router.get('/:id', [ verifyToken, verifyAdminUser ], service.getUserById);

// DELETE //
router.delete('/', [ verifyToken, verifyAdminUser ], service.deleteUser);

export default router;