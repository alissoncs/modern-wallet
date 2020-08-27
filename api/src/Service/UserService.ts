import jwt from 'jwt-simple';
import { getManager, Repository } from 'typeorm';
import { User } from '../Entity/User';
import { Account } from '../Entity/Account';
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

export interface UserAndAccount {
  user: User,
  account: Account,
}

export class UserService {

  userRepository: Repository<User>;
  accountRepository: Repository<Account>;

  constructor(
    userRepository?: Repository<User>,
    accountRepository?: Repository<Account>) {
    this.userRepository = userRepository || connection.getRepository(User);
    this.accountRepository = accountRepository || connection.getRepository(Account);
  }

  async login(data: IUserLogin): Promise<any> {
    return this.userRepository.findOneOrFail({
      email: data.email,
      // password: data.password, // TODO
    });
  }

  async create(data: IUserCreate): Promise<UserAndAccount> {
    const user = new User();
    user.name = data.name;
    user.password = data.password; // TODO encrypt
    user.email = data.email;

    const existentUser = await this.userRepository.findOne({
      email: data.email,
    });

    if (existentUser) {
      throw new Error("User already exists");
    }

    const account = new Account();
    account.balance = 0; // TODO, const here
    account.lastUpdate = new Date();
    account.dailyRent = 1.5; // percent

    await connection.manager.transaction(async transaction => {
      await transaction.save(user);
      account.user = user;
      await transaction.save(account);
    });

    return {
      account: account,
      user: user,
    };
  }

  createToken(user: User) {
    const payload: IUserAuthPayload = {
      email: user.email,
    };

    if (!process.env.JWT_SECRET) {
      throw new Error("process.env.JWT_SECRET not defined");
    }

    const token = jwt.encode(payload, process.env.JWT_SECRET!);
    return token;
  }

  async checkToken(token: string): Promise<UserAndAccount> {
    const decoded: IUserAuthPayload = jwt.decode(token, process.env.JWT_SECRET!);

    const user = await this.userRepository.findOneOrFail({
      email: decoded.email,
    });

    const account = await this.accountRepository.findOneOrFail({
      user,
    });

    return {
      user,
      account,
    };
  }

}
