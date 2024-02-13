import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();

app.use(function (_, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.use(express.json());
app.use(routes);

app.listen(process.env.API_PORT, () => console.log(`Api listening to port ${process.env.API_PORT}`));
