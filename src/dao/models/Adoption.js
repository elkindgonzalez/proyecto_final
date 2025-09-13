// src/dao/models/Adoption.js
import mongoose from "mongoose";

const collection = "Adoptions";

const schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pets",
      required: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false } // guarda createdAt automático
  }
);

const adoptionModel = mongoose.model(collection, schema);

export default adoptionModel;
