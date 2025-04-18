import mongoose from 'mongoose';
import dotenv from 'dotenv';
import request from 'supertest';
import { app } from '../src/app.js';

dotenv.config();

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB for testing');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1); // Exit on DB error
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('🔌 Disconnected MongoDB after tests');
});

describe('Backend API Tests', () => {

  it('should return 200 for the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Server is ready');
  });

  it(
    'should fetch top individual donors',
    async () => {
      const response = await request(app).get('/api/v1/leaderboard/top-individual-donors');
      console.log('Top Individual Donors Response:', response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
    },
    15000 // 15s timeout for slower response
  );

  it(
    'should fetch top restaurant donors',
    async () => {
      const response = await request(app).get('/api/v1/leaderboard/top-restaurant-donors');
      console.log('Top Restaurant Donors Response:', response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
    },
    15000
  );

  it('should return 404 for an unknown route', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  });

});
