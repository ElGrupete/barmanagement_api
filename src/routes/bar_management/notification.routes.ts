import * as service from '../../services/bar_management/notification.service';
import express = require("express");
import verifyToken from '../../middlewares/authorization';
import verifyAdminRole from '../../middlewares/admin-role';
const router = express.Router();

router.post('/', [verifyToken, verifyAdminRole], service.createNotification);
router.get('/', [verifyToken], service.getAllNotifications);
router.get('/:id', [verifyToken], service.getNotificationById);
router.put('/:id', [verifyToken, verifyAdminRole], service.updateNotification);
router.delete('/:id', [verifyToken, verifyAdminRole], service.deleteNotification);

export default router;