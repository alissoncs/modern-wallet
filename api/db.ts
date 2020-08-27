import { getConnectionManager, ConnectionManager, Connection } from "typeorm";
import { User } from './src/Entity/User';
import { Account } from './src/Entity/Account';

const connectionManager = new ConnectionManager();
export const connection = connectionManager.create({
    type: "sqlite",
    database: './data/db.sqlite',
    entities: [
      User,
      Account,
    ],
    logging: true,
    synchronize: true,
});
