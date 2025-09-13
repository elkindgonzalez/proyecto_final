import { adoptionsService, petsService, usersService } from "../services/index.js";

const getAllAdoptions = async (req, res) => {
  try {
    const result = await adoptionsService.getAll();
    res.send({ status: "success", payload: result });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const getAdoption = async (req, res) => {
  try {
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getById(adoptionId);
    if (!adoption) {
      return res.status(404).send({ status: "error", error: "Adoption not found" });
    }
    res.send({ status: "success", payload: adoption });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const createAdoption = async (req, res) => {
  try {
    const { uid, pid } = req.body; // 👈 ahora usa body
    if (!uid || !pid) {
      return res.status(400).send({ status: "error", error: "uid and pid are required" });
    }

    const user = await usersService.getUserById(uid);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }

    const pet = await petsService.getById(pid);
    if (!pet) {
      return res.status(404).send({ status: "error", error: "Pet not found" });
    }

    if (pet.adopted) {
      return res.status(400).send({ status: "error", error: "Pet is already adopted" });
    }

    // actualizar user y pet
    user.pets.push(pet._id);
    await usersService.update(user._id, { pets: user.pets });
    await petsService.update(pet._id, { adopted: true, owner: user._id });

    // crear adopción
    const adoption = await adoptionsService.create({ owner: user._id, pet: pet._id });

    res.status(201).send({ status: "success", payload: adoption._id }); // 👈 devolvemos id
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

export default {
  createAdoption,
  getAllAdoptions,
  getAdoption
};
