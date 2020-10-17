import * as service from '../../services/bar_management/category.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createCategory);
router.get('/', [verifyToken], service.getAllCategories);
router.get('/:id', [verifyToken], service.getCategoryById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateCategory);
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteCategory);

export default router;