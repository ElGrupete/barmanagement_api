import * as service from '../../services/bar_management/product.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createProduct);
router.get('/', [verifyToken], service.getAllProducts);
router.get('/:id', [verifyToken], service.getProductById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateProduct);
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteProduct);

export default router;