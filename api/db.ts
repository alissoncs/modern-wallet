import { getConnectionManager, ConnectionManager, Connection } from "typeorm";
import { User } from './src/Entity/User';
import { AccountSummary } from './src/Entity/AccountSummary';
import { Account } from './src/Entity/Account';

const connectionManager = new ConnectionManager();
export const connection = connectionManager.create({
    type: "sqlite",
    database: './data/line.sqlite',
    entities: [
      User,
      Account,
      AccountSummary,
    ],
    logging: true,
    synchronize: true,
});
