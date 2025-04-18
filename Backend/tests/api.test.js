import request from 'supertest';
import { app } from '../src/app'; // Ensure this points to your Express app

describe('Backend API Tests', () => {
  it('should return 200 for the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Server is ready');
  });

  it('should fetch top individual donors', async () => {
    const response = await request(app).get('/api/v1/leaderboard/top-individual-donors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should fetch top restaurant donors', async () => {
    const response = await request(app).get('/api/v1/leaderboard/top-restaurant-donors');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('data');
  });

  it('should return 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  });
});