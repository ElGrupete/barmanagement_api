import * as service from '../../services/bar_management/combo.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createCombo);
router.get('/', [verifyToken, verifyAdminRole], service.getAllCombos);
router.get('/:id', [verifyToken, verifyAdminRole], service.getComboById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateCombo);
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteCombo);

export default router;