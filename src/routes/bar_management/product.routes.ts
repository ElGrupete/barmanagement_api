import { createProduct, getAllProducts, getProductById, updateProduct } from '../../services/product.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], createProduct);
router.get('/', [verifyToken, verifyAdminRole], getAllProducts);
router.get('/:id', [verifyToken, verifyAdminRole], getProductById);
router.put('/:id', [verifyToken, verifyAdminRole], updateProduct);

export default router;