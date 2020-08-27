import { Router } from 'express';
import { promise } from './Middleware/RoutePromiseMiddleware';
import { AuthMiddleware } from './Middleware/AuthMiddleware';
import { UserController } from './Controller/UserController';

const router: Router = Router();

//primary routes
router.post('/login', UserController.login);
router.get('/account', AuthMiddleware.verify, UserController.detail);
router.post('/account', UserController.create);

export default router;
