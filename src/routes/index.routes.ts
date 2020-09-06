import { Router } from 'express';
import Dummy from './dummy.routes';
import Role from './bar_config/role.routes';
import User from './bar_config/user.routes';
import Login from './login.routes';
import Product from './bar_management/product.routes';

const router: Router = Router();

router.use('/dummy', Dummy);
router.use('/role', Role);
router.use('/user', User);
router.use('/login', Login);
router.use('/product', Product);

export default router;