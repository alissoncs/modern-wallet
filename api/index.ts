import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import routes from './src/routes';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}`);
});
