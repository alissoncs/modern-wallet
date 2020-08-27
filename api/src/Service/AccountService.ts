import { Repository } from 'typeorm';
import { User } from '../Entity/User';
import { Account } from '../Entity/Account';
import { AccountSummary, Operation } from '../Entity/AccountSummary';
import { connection } from '../../db';

export interface IUserLogin {
  email: string,
  password: string,
};

export interface IUserCreate {
  email: string,
  name: string,
  password: string,
}

export interface IUserAuthPayload {
  email: string,
}

export interface BalanceUpdate {
  value: number,
  operation: Operation,
  account?: Account,
}

export interface DepositData {
  value: number,
  machine: string,
}

export interface WithdrawData {
  value: number,
  machine: string,
}

export class AccountService {
  accountRepository: Repository<Account>;
  summaryRepository: Repository<AccountSummary>;

  constructor(summaryRepository?: Repository<AccountSummary>, accountRepository?: Repository<Account>) {
    this.accountRepository = accountRepository || connection.getRepository(Account);
    this.summaryRepository = summaryRepository || connection.getRepository(AccountSummary);
  }

  async findAccountByUser(user: User): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail({
      user,
    });
    return account;
  }

  async updateBalance(account: Account, balance: BalanceUpdate): Promise<Account> {
    account.balance = balance.value;
    await this.accountRepository.save(account);

    return account;
  }

  async doDeposit(account: Account, data: DepositData): Promise<Account> {
    const currentAccount = await this.accountRepository.findOneOrFail({
      id: account.id,
    });

    if (!data.value) {
      throw new Error('Invalid value');
    }

    if (!data.machine) {
      throw new Error('Invalid machine name (examples: eletronic point, Saque e Pague)');
    }

    const newBalance = currentAccount.balance + data.value;

    // TODO transaction here
    await this.updateBalance(account, {
      operation: Operation.Deposit,
      value: newBalance,
    });

    const summary = new AccountSummary();
    summary.paymentDetail = '';
    summary.value = data.value;
    summary.date = new Date();
    summary.account = account;
    summary.operation = Operation.Deposit;

    await this.registerSummary(summary);

    return await this.accountRepository.findOneOrFail({
      id: account.id,
    });
  }

  async doWithdraw(account: Account, data: WithdrawData): Promise<Account> {
    const currentAccount = await this.accountRepository.findOneOrFail({
      id: account.id,
    });

    if (!data.value) {
      throw new Error('Invalid value');
    }

    if (!data.machine) {
      throw new Error('Invalid machine name (examples: eletronic point, Saque e Pague)');
    }

    if (currentAccount.balance < data.value) {
      throw new Error('Insufitient balance to a withdraw');
    }

    const newBalance = currentAccount.balance - data.value;

    // TODO transaction here
    await this.updateBalance(account, {
      operation: Operation.Deposit,
      value: newBalance,
    });

    const summary = new AccountSummary();
    summary.paymentDetail = `Withdraw has done at ${data.machine}`;
    summary.value = data.value;
    summary.date = new Date();
    summary.account = account;
    summary.operation = Operation.Withdraw;

    await this.registerSummary(summary);

    return await this.accountRepository.findOneOrFail({
      id: account.id,
    });
  }

  async registerSummary(summaryItem: AccountSummary): Promise<AccountSummary> {
    return await this.summaryRepository.save(summaryItem);
  }

  async getSummary(account: Account): Promise<AccountSummary[]> {
    const [list, count] = await this.summaryRepository.findAndCount({
      where: {
        account: account,
      },
      order: {
        date: 'DESC',
      }
    });
    return list;
  }
}
