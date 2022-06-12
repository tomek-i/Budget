import axios from 'axios';
import { appendFile } from 'fs';
import supertest from 'supertest';
import { server } from '../../src/server';
import { Basiq } from '../../src/services/BasiqService';
describe('Basiq tests', () => {
  const basiqService = new Basiq();

  const request = supertest(server);
  const EXISTING_BASIQ_USER_WITH_CONSENT =
    '8ee3d430-807c-4fe7-9117-5bed2bac8cb0';

  // beforeAll(() => {
  //   return initializeCityDatabase();
  // });

  // it('Generate Server Token', async () => {
  //   const result = await basiqService.generateServerToken();
  //   expect(result.access_token).not.toBeNull();
  //   expect(result.access_token.length).toBeGreaterThan(5);
  //   expect(result.token_type).toBe('Bearer');

  //   // const result = await supertest(app).get('/api');
  //   // expect(result.text).toEqual('Hello World!');
  //   // expect(result.statusCode).toEqual(200);
  // });

  describe('POST /api/basiq/token ', () => {
    it('responds with a json Bearer token', async () => {
      await request
        .post('/api/basiq/token')
        .set('Content-Type', 'application/json')
        .send({ token: 'server' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveProperty('data');
        });
    });
  });

  describe('POST /api/basiq/user ', () => {
    it('creates a user and responds with the data', async () => {
      await request
        .post('/api/basiq/user')
        .set('Content-Type', 'application/json')
        .send({
          email: 'jest@example.com',
          mobile: '+61410888999',
          firstname: 'test',
          lastname: 'example',
        })
        .expect('Content-Type', /json/)
        .expect(201)
        .then(async (response) => {
          expect(response.body).toHaveProperty('id');
          await axios.delete(
            `https://au-api.basiq.io/users/${response.body.id}`,
            {
              headers: {
                authorization:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiI3NDcyZDI4Ni0xMDZjLTQyNzYtYmI5YS1jZTc5NmE0YmI5ZjQiLCJhcHBsaWNhdGlvbmlkIjoiZTE3ZTg2YzUtZjI3YS00YWY0LTgxYzQtNzNjMzdhYzk0Mjg5Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50Ijp0cnVlLCJjb25uZWN0X3N0YXRlbWVudHMiOmZhbHNlLCJlbnJpY2giOiJkaXNhYmxlZCIsImVucmljaF9lbnRpdHkiOmZhbHNlLCJlbnJpY2hfbG9jYXRpb24iOmZhbHNlLCJlbnJpY2hfY2F0ZWdvcnkiOmZhbHNlLCJhZmZvcmRhYmlsaXR5Ijoic2FuZGJveCIsImluY29tZSI6InNhbmRib3giLCJleHBlbnNlcyI6InNhbmRib3giLCJleHAiOjE2NTUwNTY1MTEsImlhdCI6MTY1NTA1MjkxMSwidmVyc2lvbiI6IjIuMSIsImRlbmllZF9wZXJtaXNzaW9ucyI6W119.c-tqQNDxb5gAjTeGxm35rb-6lV0yVDqZh2n1EqNkJPg',
              },
            },
          );
        });
    });
  });

  describe('POST /api/basiq/consent ', () => {
    it('creates a user and responds with the data', async () => {
      const response = await request
        .post('/api/basiq/user')
        .set('Content-Type', 'application/json')
        .send({
          email: 'jest@example.com',
          mobile: '+61410888999',
          firstname: 'test',
          lastname: 'example',
        });
      await request
        .post('/api/basiq/consent')
        .set('Content-Type', 'application/json')
        .send({ userId: response.body.id })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(async (r) => {
          expect(r.body).toHaveProperty('url');
          await axios.delete(
            `https://au-api.basiq.io/users/${response.body.id}`,
            {
              headers: {
                authorization:
                  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyaWQiOiI3NDcyZDI4Ni0xMDZjLTQyNzYtYmI5YS1jZTc5NmE0YmI5ZjQiLCJhcHBsaWNhdGlvbmlkIjoiZTE3ZTg2YzUtZjI3YS00YWY0LTgxYzQtNzNjMzdhYzk0Mjg5Iiwic2NvcGUiOiJTRVJWRVJfQUNDRVNTIiwic2FuZGJveF9hY2NvdW50Ijp0cnVlLCJjb25uZWN0X3N0YXRlbWVudHMiOmZhbHNlLCJlbnJpY2giOiJkaXNhYmxlZCIsImVucmljaF9lbnRpdHkiOmZhbHNlLCJlbnJpY2hfbG9jYXRpb24iOmZhbHNlLCJlbnJpY2hfY2F0ZWdvcnkiOmZhbHNlLCJhZmZvcmRhYmlsaXR5Ijoic2FuZGJveCIsImluY29tZSI6InNhbmRib3giLCJleHBlbnNlcyI6InNhbmRib3giLCJleHAiOjE2NTUwNTY1MTEsImlhdCI6MTY1NTA1MjkxMSwidmVyc2lvbiI6IjIuMSIsImRlbmllZF9wZXJtaXNzaW9ucyI6W119.c-tqQNDxb5gAjTeGxm35rb-6lV0yVDqZh2n1EqNkJPg',
              },
            },
          );
        });
    });
  });

  afterAll(() => {
    server.close();
  });
});
