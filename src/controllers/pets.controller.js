// src/controllers/pets.controller.js
import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js";
import __dirname from "../utils/index.js";

const getAllPets = async (_req, res) => {
  try {
    const pets = await petsService.getAll();
    res.send({ status: "success", payload: pets });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const getPet = async (req, res) => {
  try {
    const petId = req.params.pid;
    const pet = await petsService.getById(petId);
    if (!pet) {
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }
    res.send({ status: "success", payload: pet });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const createPet = async (req, res) => {
  try {
    const { name, specie, birthDate } = req.body; // 👈 campos alineados
    if (!name || !specie) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    const pet = PetDTO.getPetInputFrom({ name, specie, birthDate });
    const result = await petsService.create(pet);

    res.status(201).send({ status: "success", payload: result._id }); // 👈 devolvemos solo el id
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const updatePet = async (req, res) => {
  try {
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    await petsService.update(petId, petUpdateBody);
    res.send({ status: "success", message: "pet updated" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const deletePet = async (req, res) => {
  try {
    const petId = req.params.pid;
    await petsService.delete(petId);
    res.send({ status: "success", message: "pet deleted" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const createPetWithImage = async (req, res) => {
  try {
    const file = req.file;
    const { name, specie, birthDate } = req.body; // 👈 alineado con Swagger/tests
    if (!name || !specie) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    const pet = PetDTO.getPetInputFrom({
      name,
      specie,
      birthDate,
      image: `${__dirname}/../public/img/${file.filename}`,
    });

    const result = await petsService.create(pet);

    res.status(201).send({ status: "success", payload: result._id });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

export default {
  getAllPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
  createPetWithImage,
};
