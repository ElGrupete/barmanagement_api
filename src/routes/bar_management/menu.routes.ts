import * as service from '../../services/bar_management/menu.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createMenu);
router.get('/', [verifyToken], service.getAllMenus);
router.get('/:id', [verifyToken], service.getMenuById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateMenu);
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteMenu);

export default router;