import { NextFunction, Request, Response } from 'express';
import { AccountService, DepositData, WithdrawData } from '../Service/AccountService';
import { Account } from '../Entity/Account';;
import { PaymentBarCodeService } from '../Service/PaymentBarCodeService';
import { PaymentData } from '../Service/IPaymentService';

export class AccountController {
  static async summary(req: Request, res: Response, next: NextFunction): Promise<any> {
    const service = new AccountService();

    const account: Account = <Account>req.account;

    service.getSummary(account)
      .then((summary) => {
        return res.json({
          account,
          summary,
        });
      }).catch((err: Error) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  }

  static async deposit(req: Request, res: Response, next: NextFunction): Promise<any> {
    const service = new AccountService();
    const data: DepositData = <DepositData>req.body;
    const account: Account = <Account>req.account;

    service.doDeposit(account, data)
      .then((account) => {
        return res.json({
          account,
        });
      }).catch((err: Error) => {
        return res.status(500).json({
          error: err.message,
        });
      });
  }

  static async withdraw(req: Request, res: Response, next: NextFunction): Promise<any> {

    const service = new AccountService();
    const data: WithdrawData = <WithdrawData>req.body;
    const account: Account = <Account>req.account;

    service.doWithdraw(account, data)
      .then((account) => {
        return res.json({
          account,
        });
      }).catch((err: Error) => {
        return res.status(500).json({
          error: err.message,
        });
      });

  }

  static async payment(req: Request, res: Response, next: NextFunction): Promise<any> {
    const paymentData: PaymentData = <PaymentData>req.body;
    const account: Account = <Account>req.account;

    const service = new PaymentBarCodeService();
    service.doPayment(account, paymentData)
      .then((result) => {
        return res.json({
          result,
        });
      }).catch((err: Error) => {
        return res.status(500).json({
          error: err.message,
        });
      });

  }
}
