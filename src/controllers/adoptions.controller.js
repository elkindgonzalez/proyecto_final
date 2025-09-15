// src/controllers/adoptions.controller.js
import mongoose from 'mongoose';
import { adoptionsService, petsService, usersService } from '../services/index.js';
import { toHttpError } from '../utils/errorMap.js';

const getAllAdoptions = async (_req, res) => {
  try {
    const result = await adoptionsService.getAll();
    return res.send({ status: 'success', payload: result });
  } catch (err) {
    const { statusCode, message } = toHttpError(err, 500);
    return res.status(statusCode).send({ status: 'error', error: message });
  }
};

const getAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    if (!mongoose.isValidObjectId(aid)) {
      return res.status(400).send({ status: 'error', error: 'aid inválido' });
    }
    const adoption = await adoptionsService.getById(aid);
    if (!adoption) {
      return res.status(404).send({ status: 'error', error: 'Adoption not found' });
    }
    return res.send({ status: 'success', payload: adoption });
  } catch (err) {
    const { statusCode, message } = toHttpError(err, 500);
    return res.status(statusCode).send({ status: 'error', error: message });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.body;

    if (!uid || !pid) {
      return res.status(400).send({ status: 'error', error: 'uid and pid are required' });
    }
    if (!mongoose.isValidObjectId(uid) || !mongoose.isValidObjectId(pid)) {
      return res.status(400).send({ status: 'error', error: 'ids inválidos' });
    }

    const user = await usersService.getById(uid);
    if (!user) {
      return res.status(404).send({ status: 'error', error: 'User not found' });
    }

    const pet = await petsService.getById(pid);
    if (!pet) {
      return res.status(404).send({ status: 'error', error: 'Pet not found' });
    }

    if (pet.adopted) {
      return res.status(400).send({ status: 'error', error: 'Pet is already adopted' });
    }

    const adoption = await adoptionsService.create({ owner: uid, pet: pid });
    const adoptionId = adoption?._id?.toString?.();
    if (!adoptionId) {
      return res.status(500).send({ status: 'error', error: 'No se pudo crear la adopción' });
    }

    await usersService.update(uid, { $addToSet: { pets: new mongoose.Types.ObjectId(pid) } });
    await petsService.update(pid, { adopted: true, owner: new mongoose.Types.ObjectId(uid) });

    return res.status(201).send({ status: 'success', payload: adoptionId });
  } catch (err) {
    const { statusCode, message } = toHttpError(err, 500);
    return res.status(statusCode).send({ status: 'error', error: message });
  }
};

const updateAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    if (!mongoose.isValidObjectId(aid)) {
      return res.status(400).send({ status: 'error', error: 'aid inválido' });
    }
    const updated = await adoptionsService.update(aid, req.body);
    if (!updated) {
      return res.status(404).send({ status: 'error', error: 'Adoption not found' });
    }
    return res.send({ status: 'success', payload: updated });
  } catch (err) {
    const { statusCode, message } = toHttpError(err, 500);
    return res.status(statusCode).send({ status: 'error', error: message });
  }
};

const deleteAdoption = async (req, res) => {
  try {
    const { aid } = req.params;
    if (!mongoose.isValidObjectId(aid)) {
      return res.status(400).send({ status: 'error', error: 'aid inválido' });
    }
    const deleted = await adoptionsService.delete(aid);
    if (!deleted) {
      return res.status(404).send({ status: 'error', error: 'Adoption not found' });
    }
    return res.status(204).send();
  } catch (err) {
    const { statusCode, message } = toHttpError(err, 500);
    return res.status(statusCode).send({ status: 'error', error: message });
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption,
  updateAdoption,   
  deleteAdoption    
};
