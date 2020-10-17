import * as service from '../../services/bar_config/role.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
import verifyAdminUser from '../../middlewares/admin-role';
const router = express.Router();

// GET ALL //
router.get('/', [ verifyToken, verifyAdminUser ], service.getRoles);

// GET ONE //
router.get('/:id', [ verifyToken, verifyAdminUser ], service.getRoleById);

// POST //
router.post('/', [ verifyToken, verifyAdminUser ], service.createRole);

// PUT //
router.put('/:id', [ verifyToken, verifyAdminUser ], service.updateRole);

// DELETE //
router.delete('/:id', [ verifyToken, verifyAdminUser ], service.deleteRole);

export default router;
