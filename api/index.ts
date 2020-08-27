import express from 'express';
import { resolve } from 'path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, ".env") });

import bodyParser from 'body-parser';
import routes from './src/routes';
import { connection } from './db';

console.info('Start index');

const app = express();
app.use(bodyParser.json());

app.use(routes);

const PORT = process.env.PORT || 8081;

connection.connect()
  .then(() => {

    console.info('connect ok');
    app.listen(PORT, () => {
      console.log(`Server running at: ${PORT}, env: ${process.env.NODE_ENV}`);
    });
  }).catch(() => {

  })
