import * as service from '../../services/bar_management/category.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createCategory);
router.get('/', [verifyToken, verifyAdminRole], service.getAllCategories);
router.get('/:id', [verifyToken, verifyAdminRole], service.getCategoryById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateCategory);

export default router;