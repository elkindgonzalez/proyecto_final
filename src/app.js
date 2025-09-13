import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'; // 👈 AÑADIR

const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
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
app.use('/api/mocks', mocksRouter); // 👈 AÑADIR

app.listen(PORT, () => console.log(`🚀 Servidor escuchando en el puerto ${PORT}`));
