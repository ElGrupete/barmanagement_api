import * as service from '../../services/bar_config/table.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
import verifyAdminTable from '../../middlewares/admin-role';
const router = express.Router();

// POST //
router.post('/', [ verifyToken, verifyAdminTable ], service.createTable);

// GET ALL //
router.get('/', [ verifyToken, verifyAdminTable ], service.getTables);

// GET ONE //
router.get('/:id', [ verifyToken, verifyAdminTable ], service.getTableById);

// UPDATE //
router.put('/:id', [ verifyToken, verifyAdminTable ], service.updateTable);

// DELETE //
router.delete('/:id', [ verifyToken, verifyAdminTable ], service.deleteTable);

export default router;