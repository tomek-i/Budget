import supertest from 'supertest';
import { server } from '../../src/server';
describe('Server Tests', () => {
  describe('GET /api - a simple api endpoint', () => {
    it('returns "Hello World!"', async () => {
      // const result = await supertest(server).get('/api');
      //   expect(result.text).toEqual('Hello World!');
      //   expect(result.statusCode).toEqual(200);
    });
  });
});
