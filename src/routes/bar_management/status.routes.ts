import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
import * as service from '../../services/bar_management/status.service';

const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createStatus);
router.get('/', [verifyToken, verifyAdminRole], service.getAllStatuses);
// router.get('/:id', [verifyToken, verifyAdminRole], service.getProductById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateStatus);

export default router;