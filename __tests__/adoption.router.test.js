// __tests__/adoption.router.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';

jest.setTimeout(20000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Adoptions - functional tests', () => {
  let uid, pid, adoptionId;

  test('fixture: create user', async () => {
    const res = await request(app).post('/api/users').send({
      first_name: 'Test',
      last_name: 'Adopter',
      email: `adopter_${Date.now()}@test.com`,
      password: '123456',
      role: 'user'
    });
    expect([200,201]).toContain(res.status);
    uid = res.body.payload || res.body._id || res.body.id;
    expect(uid).toBeDefined();
  });

  test('fixture: create pet', async () => {
    const res = await request(app).post('/api/pets').send({
      name: 'Firulais',
      type: 'dog',
      age: 2
    });
    expect([200,201]).toContain(res.status);
    pid = res.body.payload || res.body._id || res.body.id;
    expect(pid).toBeDefined();
  });

  test('POST /api/adoptions (success)', async () => {
    const res = await request(app).post('/api/adoptions').send({ uid, pid });
    expect(res.status).toBe(201); // 👈 ahora esperamos 201
    expect(res.body.status).toBe("success");
    adoptionId = res.body.payload; // 👈 guardamos el id
    expect(adoptionId).toBeDefined();
  });

  test('POST /api/adoptions (error body inválido)', async () => {
    const res = await request(app).post('/api/adoptions').send({ uid }); // falta pid
    expect(res.status).toBe(400);
    expect(res.body.status).toBe("error");
  });

  test('GET /api/adoptions (lista)', async () => {
    const res = await request(app).get('/api/adoptions?limit=5');
    expect(res.status).toBe(200);
    const items = res.body.items || res.body.payload || [];
    expect(Array.isArray(items)).toBe(true);
  });

  test('GET /api/adoptions/:id', async () => {
    const res = await request(app).get(`/api/adoptions/${adoptionId}`);
    expect([200,404]).toContain(res.status);
  });
});
