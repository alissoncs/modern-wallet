import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}`);
});
