// src/dao/models/User.js
import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name:  { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    role:       { type: String, enum: ['user', 'admin'], default: 'user' },

    // 👇 Arreglo de ObjectId directos, apuntando a la colección de mascotas
    pets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pets',     // Asegúrate que tu modelo de mascotas se registre como 'Pets'
        default: []
      }
    ]
  },
  { timestamps: true } // crea automáticamente createdAt y updatedAt
);

const userModel = mongoose.model(collection, schema);

export default userModel;
