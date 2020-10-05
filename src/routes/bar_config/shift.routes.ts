import * as service from '../../services/bar_config/shift.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();
// web.com/shift/

// GET ALL // 
router.get('/', [verifyToken], service.getShifts);

// GET ONE //
router.get('/:id', [verifyToken], service.getShiftById);

// POST //
router.post('/', [verifyToken, verifyAdminRole],service.createShift);

// PUT //
router.put('/:id', [verifyToken, verifyAdminRole], service.updateShift);

// DELETE //
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteShift);

export default router;
