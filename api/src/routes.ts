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


router.post('/account/deposit', AuthMiddleware.verify, AccountController.deposit);
router.post('/account/withdraw', AuthMiddleware.verify, AccountController.withdraw);
router.post('/account/payment', AuthMiddleware.verify, AccountController.payment);


export default router;
