import 'reflect-metadata';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import cors from 'cors';
import winston from 'winston';
import expressWinston from 'express-winston';
import { AppDataSource } from './services/DatabaseService';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(path.join(__dirname, '../.env')) });

const port = process.env.PORT;
if (!port) throw new Error('Invalid port.');

const app = express();

const allowedOrigins = [
  'http://localhost:4000',
  'http://localhost:6006',
  'http://localhost:3000',
];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.static('public'));
app.use(cors(options));
app.use(express.json());

//more options here - https://github.com/bithavoc/express-winston#request-logging
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
    meta: false,
    msg: 'HTTP  ',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  }),
);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  }),
);

app.use('/api', router);

app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ dirname: 'logs' }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json(),
    ),
  }),
);

app.listen(port, async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(false);
  console.info(`Example app listening at http://localhost:${port}`);
});
