import { Repository } from 'typeorm';
import { Account } from '../Entity/Account';
import { User } from '../Entity/User';
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

export class AccountService {
  accountRepository: Repository<Account>;

  constructor(accountRepository: Repository<Account>) {
    this.accountRepository = accountRepository || connection.getRepository(Account);
  }

  async findAccountByUser(user: User): Promise<Account> {
    const account = await this.accountRepository.findOneOrFail({
      user,
    });
    return account;
  }

}
