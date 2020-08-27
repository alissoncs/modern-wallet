import { Repository } from 'typeorm';
import { Account } from '../Entity/Account';
import { User } from '../Entity/User';
import { connection } from '../../db';
import { AccountSummary, Operation } from '../Entity/AccountSummary';

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

  async updateBalance(balance: BalanceUpdate) {
  }

  async getSummary(account: Account): Promise<AccountSummary[]> {
    const list = await this.summaryRepository.find({
      account: account,
    });
    return list;
  }
}
