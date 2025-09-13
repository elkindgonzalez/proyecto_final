import { Router } from 'express';
import { generateMockUsers, generateMockPets, prepareForInsert } from '../utils/mocking.js';
import UserModel from '../dao/models/User.js';   // 👈 verifica que tu ruta sea esta
import PetModel from '../dao/models/Pet.js';     // 👈 verifica que tu ruta sea esta

const router = Router();

// GET /api/mocks/mockingusers → genera usuarios fake (no guarda en DB)
router.get('/mockingusers', (req, res) => {
  const count = parseInt(req.query.count) || 50;
  const users = generateMockUsers(count);
  res.json({ status: 'success', count: users.length, payload: users });
});

// GET /api/mocks/mockingpets → genera mascotas fake (no guarda en DB)
router.get('/mockingpets', (req, res) => {
  const count = parseInt(req.query.count) || 20;
  const pets = generateMockPets(count);
  res.json({ status: 'success', count: pets.length, payload: pets });
});

// POST /api/mocks/generateData → inserta usuarios y pets en la BD
router.post('/generateData', async (req, res) => {
  try {
    const usersCount = parseInt(req.body.users) || 0;
    const petsCount = parseInt(req.body.pets) || 0;

    // Generar datos
    const users = usersCount > 0 ? generateMockUsers(usersCount) : [];
    const pets = petsCount > 0 ? generateMockPets(petsCount) : [];

    // Limpiar campos (_id, createdAt, updatedAt) para que Atlas asigne los suyos
    const cleanUsers = prepareForInsert(users);
    const cleanPets = prepareForInsert(pets);

    // Insertar en Mongo
    const insertedUsers = cleanUsers.length ? await UserModel.insertMany(cleanUsers) : [];
    const insertedPets = cleanPets.length ? await PetModel.insertMany(cleanPets) : [];

    res.json({
      status: 'success',
      inserted: { users: insertedUsers.length, pets: insertedPets.length }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', error: err.message });
  }
});

export default router;
