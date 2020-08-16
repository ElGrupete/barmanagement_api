import { Router } from 'express';
import Dummy from './dummy/dummy.routes';
import Role from './role/role.routes';
import User from './user/user.routes';

const router: Router = Router();

router.use('/dummy', Dummy);
router.use('/role', Role);
router.use('/user', User)

export default router;