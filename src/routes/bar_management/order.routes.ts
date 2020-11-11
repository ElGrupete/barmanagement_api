import * as service from '../../services/bar_management/order.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken], service.createOrder);
router.get('/tableId/:id', [verifyToken], service.getOrderByTableId);
router.get('/:id', [verifyToken], service.getOrderById);
router.put('/:id', [verifyToken], service.updateOrder);
router.delete('/:id', [verifyToken], service.deleteOrder);

export default router;