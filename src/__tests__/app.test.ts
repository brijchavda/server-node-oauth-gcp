import request from 'supertest';
import app from '../app';

describe('API Endpoints', () => {
  describe('GET /', () => {
    it('should return 200 OK with text "OK"', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
    });
  });

  describe('GET /api/greetings', () => {
    it('should return 200 OK with greeting message', async () => {
      const response = await request(app).get('/api/greetings');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toBe('Hello, welcome to our API!');
    });
  });

  describe('GET /api/greetings/:name', () => {
    it('should return 200 OK with personalized greeting', async () => {
      const name = 'John';
      const response = await request(app).get(`/api/greetings/${name}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body.message).toBe(`Hello ${name}, welcome to our API!`);
    });
  });
});