import { NextFunction, Request, Response } from 'express';
import { UserService, IUserLogin, IUserCreate } from '../Service/UserService';
// import { IRequestWithUser } from '../Middleware/AuthMiddleware';
import { User } from '../Entity/User';

export class UserController {
  static async login(req: Request, res: Response, next: NextFunction): Promise<any> {
    const loginData = req.body as IUserLogin;

    const service = new UserService();
    service.login(loginData)
      .then((user: User) => {
        const token = service.createToken(user);
        res.json({
          ok: true,
          name: user.name,
          token,
        });
      }).catch((err: Error) => {
        res.status(500).json({
          error: err.message,
        });
      });

  }

  static async create(req: Request, res: Response, next: NextFunction): Promise<any> {
    const account = req.body as IUserCreate;

    const service = new UserService();
    service.create(account).then(() => {
      res.json({
        ok: true,
      });
    }).catch((err: Error) => {
      res.status(500).json({
        error: err.message,
      });
    });

  }

  static async detail(req: Request, res: Response, next: NextFunction): Promise<any> {
    res.json({
      test: 1,
      user: req.user,
      account: req.account,
    });
  }
}
