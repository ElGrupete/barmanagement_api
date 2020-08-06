import { Router } from 'express';
import Dummy from './dummy/dummy.routes';

const router: Router = Router();

router.use('/dummy', Dummy);

export default router;