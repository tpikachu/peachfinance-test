import makeApp from '../../makeApp';
import request from 'supertest';

describe('GET /', () => {
  test('returns "Task List API"', async () => {
    const app = makeApp();
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual('Task List API');
  });
});
