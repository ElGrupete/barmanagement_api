import * as service from '../../services/bar_config/role.service';
import express = require("express");
const router = express.Router();

// GET ALL //
router.get('/', service.getRoles);

// GET ONE //
router.get('/:id', service.getRoleById);

// POST //
router.post('/', service.createRole);

// PUT //
router.put('/:id', service.updateRole);

// DELETE //
router.delete('/:id', service.deleteRole);

export default router;
