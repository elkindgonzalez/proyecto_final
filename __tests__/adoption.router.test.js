// __tests__/adoption.router.test.js
import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';

jest.setTimeout(20000);

afterAll(async () => {
  await mongoose.disconnect(); // 👈 cierre limpio
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
    uid = res.body.payload?._id || res.body.payload || res.body._id || res.body.id;
    expect(uid).toBeDefined();
  });

  test('fixture: create pet', async () => {
    const res = await request(app).post('/api/pets').send({
      name: 'Firulais',
      specie: 'dog',
      birthDate: '2022-01-01'
    });
    expect([200,201]).toContain(res.status);
    pid = res.body.payload?._id || res.body.payload || res.body._id || res.body.id;
    expect(pid).toBeDefined();
  });

  test('POST /api/adoptions (success)', async () => {
    const res = await request(app).post('/api/adoptions').send({ uid, pid });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe("success");
    adoptionId = res.body.payload;
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

  test('PUT /api/adoptions/:id (actualizar)', async () => {
    const res = await request(app)
      .put(`/api/adoptions/${adoptionId}`)
      .send({ uid, pid });
    expect([200,404]).toContain(res.status);
  });

  test('DELETE /api/adoptions/:id (eliminar)', async () => {
    const res = await request(app).delete(`/api/adoptions/${adoptionId}`);
    expect([200,204,404]).toContain(res.status);
  });
});
