import * as service from '../../services/bar_config/waiter.service';
import express = require("express");
import verifyToken from "../../middlewares/authorization";
import verifyAdminWaiter from '../../middlewares/admin-role';
const router = express.Router();

// POST //
router.post('/', [ verifyToken, verifyAdminWaiter ], service.createWaiter);

// GET ALL //
router.get('/', [ verifyToken, verifyAdminWaiter ], service.getWaiters);

// GET ONE //
router.get('/:id', [ verifyToken, verifyAdminWaiter ], service.getWaiterById);

// UPDATE //
router.put('/:id', [ verifyToken, verifyAdminWaiter ], service.updateWaiter);

// DELETE //
router.delete('/:id', [ verifyToken, verifyAdminWaiter ], service.deleteWaiter);

export default router;