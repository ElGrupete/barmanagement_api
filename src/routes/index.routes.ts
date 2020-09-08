import { Router } from 'express';
import Dummy from './dummy.routes';
import Role from './bar_config/role.routes';
import User from './bar_config/user.routes';
import Login from './login.routes';
import Product from './bar_management/product.routes';
import Category from './bar_management/category.routes';
import Menu from './bar_management/menu.routes';
import Status from './bar_management/status.routes';

const router: Router = Router();

router.use('/dummy', Dummy);
router.use('/role', Role);
router.use('/user', User);
router.use('/login', Login);
router.use('/product', Product);
router.use('/category', Category);
router.use('/menu', Menu);
router.use('/status', Status);

export default router;