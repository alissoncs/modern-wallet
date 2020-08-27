import { NextFunction, Request, Response } from 'express';
import { UserService, UserAndAccount } from '../Service/UserService';
import { User } from '../Entity/User';
import { StatusCode } from '../Constants/StatusCode';
import { Messages } from '../Constants/Messages';

declare module 'express-serve-static-core' {
  interface Request {
    user: object | string,
    account: object | string,
  }
}

export class AuthMiddleware {
  static verify(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization || '';

    if (token) token = token.replace('Bearer ', '');

    if (!token) {
      return res.status(StatusCode.AUTHORIZATION).json({
        error: Messages.AUTHORIZATION_TOKEN_ERROR,
      });
    }

    const service = new UserService();
    service.checkToken(token).then((userAndAccount: UserAndAccount) => {
      req.account = userAndAccount.account;
      req.user = userAndAccount.user;
      next();
    }).catch((err: Error) => {
      return res.status(StatusCode.AUTHORIZATION).json({
        error: Messages.AUTHORIZATION_TOKEN_ERROR,
        detail: err.message,
      });
    });

  }
}
