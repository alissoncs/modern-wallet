import { Repository } from 'typeorm';
import { IPaymentService, PaymentData, PaymentDataResult, PaymentStatus } from './IPaymentService';
import { AccountService, BalanceUpdate } from './AccountService';
import { Operation } from '../Entity/AccountSummary';
import { Account } from '../Entity/Account';
import { AccountSummary } from '../Entity/AccountSummary';
import { connection } from '../../db';

export class PaymentBarCodeService implements IPaymentService {
  accountService: AccountService;
  summaryRepository: Repository<AccountSummary>;


  constructor(accountService?: AccountService, summaryRepository?: Repository<AccountSummary>) {
    this.accountService = accountService || new AccountService();
    this.summaryRepository = summaryRepository || connection.getRepository(AccountSummary);
  }

  async doPayment(account: Account, data : PaymentData): Promise<PaymentDataResult> {
    // TODO
    // CALL EXTERNAL PAYMENT SERVICE HERE

    if (!data.value) {
      throw new Error('Invalid value');
    }

    if (account.balance < data.value) {
      throw new Error('Insufitient balance to a pay');
    }

    const newBalance = account.balance - data.value;

    const balanceUpdate: BalanceUpdate = {
      value: newBalance,
      operation: Operation.Payment,
    };

    const summary = new AccountSummary();
    summary.paymentDetail = `Bar Code Payment Slip ${data.value}`;
    summary.value = data.value;
    summary.date = new Date();
    summary.account = account;
    summary.operation = Operation.Payment;

    await this.summaryRepository.save(summary);
    await this.accountService.updateBalance(account, balanceUpdate);

    return {
      ...data,
      status: PaymentStatus.Processing,
    };
  }
}
