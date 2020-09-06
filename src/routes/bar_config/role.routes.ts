import * as services from '../../services/role.service';
import express = require("express");
const router = express.Router();

// GET ALL //
router.get('/', services.getRoles);

// GET ONE //
router.get('/:id', services.getRoleById);

// POST //
router.post('/', services.createRole);

// PUT //
router.put('/:id', services.updateRole);

// DELETE //
router.delete('/', services.deleteRole);

export default router;
