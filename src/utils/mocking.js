// utils/mocking.js
import { fakerES as faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const HASHED_PASSWORD = bcrypt.hashSync('coder123', 10);
const ROLES = ['user', 'admin'];

function mongoId() {
  return new mongoose.Types.ObjectId();
}

/**
 * Usuario mock con:
 * - password "coder123" encriptada
 * - role ∈ {user, admin}
 * - pets: []
 * - _id y timestamps para simular documento Mongo
 */
export function generateMockUser() {
  const first = faker.person.firstName();
  const last = faker.person.lastName();
  return {
    _id: mongoId(),
    first_name: first,
    last_name: last,
    email: faker.internet.email({ firstName: first, lastName: last }).toLowerCase(),
    password: HASHED_PASSWORD,
    role: ROLES[Math.floor(Math.random() * ROLES.length)],
    pets: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function generateMockUsers(count = 50) {
  return Array.from({ length: count }, () => generateMockUser());
}

/**
 * Mascota mock.
 * ⚠️ Usa "type" para ser consistente con un esquema típico:
 *   { type: { type: String, enum: ['dog','cat','bird','other'] } }
 */
export function generateMockPet() {
  return {
    _id: mongoId(),
    name: faker.animal.petName(),
    type: faker.helpers.arrayElement(['dog', 'cat', 'bird', 'other']),
    age: faker.number.int({ min: 0, max: 18 }),
    adopted: faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function generateMockPets(count = 20) {
  return Array.from({ length: count }, () => generateMockPet());
}

/**
 * Utilidades por si quieres insertar en Mongo dejando que Atlas asigne _id/timestamps.
 * Úsalas antes de insertMany si tu esquema tiene timestamps automáticos.
 */
export function stripMongoFieldsForInsert(doc) {
  const { _id, createdAt, updatedAt, ...rest } = doc;
  return rest;
}

export function prepareForInsert(list) {
  return list.map(stripMongoFieldsForInsert);
}
