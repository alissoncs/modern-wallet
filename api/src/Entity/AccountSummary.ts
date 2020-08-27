import { Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Account } from './Account';

export enum Operation {
  Deposit,
  Withdraw,
  Payment,
  Profit,
}

@Entity()
export class AccountSummary {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column('int')
  operation: Operation;

  paymentDetail: string;

  @Column()
  date: Date;

  @ManyToOne(type => Account, account => account.summary)
  account: Account;

}
