import { Router } from 'express';
import Dummy from './dummy.routes';
import Role from './bar_config/role.routes';
import User from './bar_config/user.routes';
import Login from './login.routes';
import Product from './bar_management/product.routes';
import Category from './bar_management/category.routes';
import Menu from './bar_management/menu.routes';
import Status from './bar_management/status.routes';
import Combo from './bar_management/combo.routes';
import Sector from './bar_config/sector.routes';
import Shift from './bar_config/shift.routes';
import Waiter from './bar_config/waiter.routes';
import Table from './bar_config/table.routes';
import Order from './bar_management/order.routes';
import Notification from './bar_management/notification.routes';

/** Swagger configuration */
import * as swaggerUi from "swagger-ui-express";
import { swaggerDoc } from '../config/swagger';

const router: Router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
router.use('/dummy', Dummy);
router.use('/role', Role);
router.use('/user', User);
router.use('/login', Login);
router.use('/product', Product);
router.use('/category', Category);
router.use('/menu', Menu);
router.use('/status', Status);
router.use('/combo', Combo);
router.use('/sector', Sector);
router.use('/shift', Shift);
router.use('/waiter', Waiter);
router.use('/table', Table);
router.use('/order', Order);
router.use('/notification', Notification);

export default router;