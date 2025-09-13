import mongoose from 'mongoose';

const collection = 'Users';

const schema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name:  { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['user', 'admin'], default: 'user' },
  pets: {
    type: [
      {
        _id: { type: mongoose.SchemaTypes.ObjectId, ref: 'Pet' } // 👈 ref corregido
      }
    ],
    default: []
  }
}, { timestamps: true }); // 👈 agrega createdAt/updatedAt

const userModel = mongoose.model(collection, schema);

export default userModel;
