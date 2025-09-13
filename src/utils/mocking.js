import { fakerES as faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const HASHED_PASSWORD = bcrypt.hashSync('coder123', 10);
const ROLES = ['user', 'admin'];

function mongoId() {
  return new mongoose.Types.ObjectId();
}

export function generateMockUser() {
  return {
    _id: mongoId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email().toLowerCase(),
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

export function generateMockPet() {
  return {
    _id: mongoId(),
    name: faker.animal.dog(),
    species: faker.helpers.arrayElement(['dog', 'cat', 'other']),
    age: faker.number.int({ min: 0, max: 18 }),
    adopted: faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export function generateMockPets(count = 20) {
  return Array.from({ length: count }, () => generateMockPet());
}
