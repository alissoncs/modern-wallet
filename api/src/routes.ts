import { Router } from 'express';
import { promise } from './Middleware/RoutePromiseMiddleware';
import { AuthMiddleware } from './Middleware/AuthMiddleware';
import { AccountController } from './Controller/AccountController';
import { UserController } from './Controller/UserController';

const router: Router = Router();

//primary routes
router.post('/login', UserController.login);
router.post('/account', UserController.create);

// private routes
router.get('/account', AuthMiddleware.verify, UserController.detail);
router.get('/account/summary', AuthMiddleware.verify, AccountController.summary);


export default router;
