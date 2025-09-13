// src/services/index.js
import Users from "../dao/Users.dao.js";
import Pet from "../dao/Pets.dao.js";
import Adoption from "../dao/Adoption.js";

import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import AdoptionRepository from "../repository/AdoptionRepository.js";

// Fallback directo al modelo para extraer _id si el repo no lo devuelve claramente
import AdoptionModel from "../dao/models/Adoption.js";

// Instancias de tus repositorios
const usersRepo = new UserRepository(new Users());
const petsRepo = new PetRepository(new Pet());
const adoptionsRepo = new AdoptionRepository(new Adoption());

/** =========================
 *  Users Service (adaptador)
 *  ========================= */
export const usersService = {
  async create(doc) {
    if (typeof usersRepo.create === "function") return usersRepo.create(doc);
    if (typeof usersRepo.save === "function") return usersRepo.save(doc);
    if (typeof usersRepo.insert === "function") return usersRepo.insert(doc);
    throw new Error("UsersRepository no expone create/save/insert");
  },

  async getAll(filter = {}) {
    if (typeof usersRepo.getAll === "function") return usersRepo.getAll(filter);
    if (typeof usersRepo.findAll === "function") return usersRepo.findAll(filter);
    if (typeof usersRepo.list === "function") return usersRepo.list(filter);
    throw new Error("UsersRepository no expone getAll/findAll/list");
  },

  async getById(id) {
    if (typeof usersRepo.getById === "function") return usersRepo.getById(id);
    if (typeof usersRepo.getUserById === "function") return usersRepo.getUserById(id);
    if (typeof usersRepo.findById === "function") return usersRepo.findById(id);
    throw new Error("UsersRepository no expone getById/getUserById/findById");
  },

  async update(id, update) {
    // Soportar nombres alternos típicos en repositorios
    if (typeof usersRepo.updateById === "function") return usersRepo.updateById(id, update);
    if (typeof usersRepo.update === "function") return usersRepo.update(id, update);
    if (typeof usersRepo.modify === "function") return usersRepo.modify(id, update);
    if (typeof usersRepo.updateUser === "function") return usersRepo.updateUser(id, update);
    if (typeof usersRepo.updateOne === "function") return usersRepo.updateOne(id, update);
    if (typeof usersRepo.patch === "function") return usersRepo.patch(id, update);
    throw new Error("UsersRepository no expone update/updateById/modify/updateUser/updateOne/patch");
  },
};

/** =========================
 *  Pets Service (adaptador)
 *  ========================= */
export const petsService = {
  async create(doc) {
    if (typeof petsRepo.create === "function") return petsRepo.create(doc);
    if (typeof petsRepo.save === "function") return petsRepo.save(doc);
    if (typeof petsRepo.insert === "function") return petsRepo.insert(doc);
    throw new Error("PetRepository no expone create/save/insert");
  },

  async getAll(filter = {}) {
    if (typeof petsRepo.getAll === "function") return petsRepo.getAll(filter);
    if (typeof petsRepo.findAll === "function") return petsRepo.findAll(filter);
    if (typeof petsRepo.list === "function") return petsRepo.list(filter);
    throw new Error("PetRepository no expone getAll/findAll/list");
  },

  async getById(id) {
    if (typeof petsRepo.getById === "function") return petsRepo.getById(id);
    if (typeof petsRepo.getPetById === "function") return petsRepo.getPetById(id);
    if (typeof petsRepo.findById === "function") return petsRepo.findById(id);
    throw new Error("PetRepository no expone getById/getPetById/findById");
  },

  async update(id, update) {
    // Soportar nombres alternos típicos en repositorios
    if (typeof petsRepo.updateById === "function") return petsRepo.updateById(id, update);
    if (typeof petsRepo.update === "function") return petsRepo.update(id, update);
    if (typeof petsRepo.modify === "function") return petsRepo.modify(id, update);
    if (typeof petsRepo.updatePet === "function") return petsRepo.updatePet(id, update);
    if (typeof petsRepo.updateOne === "function") return petsRepo.updateOne(id, update);
    if (typeof petsRepo.patch === "function") return petsRepo.patch(id, update);
    throw new Error("PetRepository no expone update/updateById/modify/updatePet/updateOne/patch");
  },
};

/** ==============================
 *  Adoptions Service (adaptador)
 *  ============================== */
export const adoptionsService = {
  async create(doc) {
    let created;

    // 1) Intentar métodos habituales del repo (nombres alternos incluidos)
    if (typeof adoptionsRepo.create === "function") {
      created = await adoptionsRepo.create(doc);
    } else if (typeof adoptionsRepo.save === "function") {
      created = await adoptionsRepo.save(doc);
    } else if (typeof adoptionsRepo.insert === "function") {
      created = await adoptionsRepo.insert(doc);
    } else if (typeof adoptionsRepo.createAdoption === "function") {
      created = await adoptionsRepo.createAdoption(doc);
    } else if (typeof adoptionsRepo.saveAdoption === "function") {
      created = await adoptionsRepo.saveAdoption(doc);
    } else {
      throw new Error("AdoptionRepository no expone create/save/insert/createAdoption/saveAdoption");
    }

    // 2) Normalizar el _id desde distintas formas
    let id =
      created?._id?.toString?.() ||
      created?.payload?._id?.toString?.() ||
      created?.id ||
      created?.payload?.id ||
      (typeof created === "string" ? created : undefined);

    // 3) Fallback: si no tenemos id, buscamos por owner+pet en el modelo (última salvaguarda)
    if (!id && doc?.owner && doc?.pet) {
      const found = await AdoptionModel.findOne({ owner: doc.owner, pet: doc.pet })
        .sort({ _id: -1 })
        .lean();
      id = found?._id?.toString?.();
    }

    if (!id) {
      throw new Error("AdoptionRepository.create no devolvió _id y el fallback no encontró la adopción");
    }

    return { _id: id };
  },

  async getAll(filter = {}) {
    if (typeof adoptionsRepo.getAll === "function") return adoptionsRepo.getAll(filter);
    if (typeof adoptionsRepo.findAll === "function") return adoptionsRepo.findAll(filter);
    if (typeof adoptionsRepo.list === "function") return adoptionsRepo.list(filter);
    throw new Error("AdoptionRepository no expone getAll/findAll/list");
  },

  async getById(id) {
    if (typeof adoptionsRepo.getById === "function") return adoptionsRepo.getById(id);
    if (typeof adoptionsRepo.findById === "function") return adoptionsRepo.findById(id);
    if (typeof adoptionsRepo.get === "function") return adoptionsRepo.get(id);
    throw new Error("AdoptionRepository no expone getById/findById/get");
  },
};
