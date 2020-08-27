import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
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

}
