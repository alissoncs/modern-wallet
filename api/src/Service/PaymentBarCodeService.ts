import { IPaymentService, PaymentData, PaymentDataResult, PaymentStatus } from './IPaymentService';
import { AccountService, BalanceUpdate } from './AccountService';
import { Operation } from '../Entity/AccountSummary';
import { Account } from '../Entity/Account';

export class PaymentBarCodeService implements IPaymentService {
  accountService: AccountService;

  constructor(accountService?: AccountService ) {
    this.accountService = accountService || new AccountService();
  }

  async doPayment(account: Account, data : PaymentData): Promise<PaymentDataResult> {
    // TODO
    // CALL EXTERNAL PAYMENT SERVICE HERE

    const balanceUpdate: BalanceUpdate = {
      value: data.value,
      operation: Operation.Payment,
    };

    await this.accountService.updateBalance(account, balanceUpdate);

    return {
      ...data,
      status: PaymentStatus.Processing,
    };
  }
}
