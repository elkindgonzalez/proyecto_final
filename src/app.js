import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import { setupSwagger } from './docs/swagger.js'; // 👈 CORREGIDO

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch(err => {
    console.error('❌ Error al conectar a MongoDB:', err);
    process.exit(1);
  });

app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

setupSwagger(app); // 👈 habilita Swagger en /docs

// 🚀 Importante: no levantar el servidor en modo test
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
}

export default app; // 👈 útil para supertest
