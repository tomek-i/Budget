import 'reflect-metadata';
import * as dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { router } from './routes';
import cors from 'cors';

dotenv.config({ path: __dirname + '/.env' });

const port = process.env.PORT || 3000;
if (!port) throw new Error('Invalid port.');

const app = express();

//

const allowedOrigins = ['http://localhost:4000', 'http://localhost:6006'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(express.static('public'));
app.use(cors(options));
app.use(express.json());

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
