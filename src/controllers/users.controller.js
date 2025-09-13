import { usersService } from "../services/index.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.send({ status: "success", payload: users });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    res.send({ status: "success", payload: user });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

// 👇 NUEVO
const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res
        .status(400)
        .send({ status: "error", error: "Incomplete values" });
    }

    const newUser = await usersService.create({
      first_name,
      last_name,
      email,
      password,
      role: role || "user"
    });

    res
      .status(201)
      .send({ status: "success", payload: newUser._id });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    await usersService.update(userId, updateBody);
    res.send({ status: "success", message: "User updated" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if (!user) {
      return res.status(404).send({ status: "error", error: "User not found" });
    }
    await usersService.delete(userId);
    res.send({ status: "success", message: "User deleted" });
  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
};

export default {
  getAllUsers,
  getUser,
  createUser,   // 👈 exportamos el nuevo
  updateUser,
  deleteUser,
};
