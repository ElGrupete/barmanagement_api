import * as service from '../../services/bar_config/sector.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();
// web.com/sector/

// GET ALL // 
router.get('/', [verifyToken], service.getSectors);

// GET ONE //
router.get('/:id', [verifyToken], service.getSectorById);

// POST //
router.post('/', [verifyToken, verifyAdminRole],service.createSector);

// PUT //
router.put('/:id', [verifyToken, verifyAdminRole], service.updateSector);

// DELETE //
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteSector);

export default router;
