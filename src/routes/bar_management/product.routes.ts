import * as service from '../../services/bar_management/product.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createProduct);
router.get('/', [verifyToken, verifyAdminRole], service.getAllProducts);
router.get('/:id', [verifyToken, verifyAdminRole], service.getProductById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateProduct);

export default router;