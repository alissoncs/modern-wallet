import { NextFunction, Request, Response } from 'express';
import { AccountService } from '../Service/AccountService';
import { Account } from '../Entity/Account';
import { AccountSummary } from '../Entity/AccountSummary';

export class AccountController {
  static async summary(req: Request, res: Response, next: NextFunction): Promise<any> {
    const service = new AccountService();

    const account: Account = <Account>req.account;

    service.getSummary(account)
      .then((summary) => {
        return res.json({
          summary,
        });
      }).catch((err: Error) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  }

  static async deposit(req: Request, res: Response, next: NextFunction): Promise<any> {
  }

  static async withdraw(req: Request, res: Response, next: NextFunction): Promise<any> {
  }

  static async payment(req: Request, res: Response, next: NextFunction): Promise<any> {
  }
}
