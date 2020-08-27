import { Entity, OneToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AccountSummary } from './AccountSummary';
import { User } from './User';
@Entity()
export class Account {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @Column()
  lastUpdate: Date;

  @OneToOne(type => User, user => user.account)
  @JoinColumn()
  user: User;

  @OneToMany(type => AccountSummary, summary => summary.account)
  summary: AccountSummary;

}
