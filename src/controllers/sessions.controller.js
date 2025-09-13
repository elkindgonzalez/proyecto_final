import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

// 👉 Función para firmar tokens de forma segura
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
    algorithm: process.env.JWT_ALG
  });
}

// 👉 Función para verificar tokens de forma segura
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: [process.env.JWT_ALG]
  });
}

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send({ status: "error", error: "Incomplete values" });
    }

    const exists = await usersService.getUserByEmail(email);
    if (exists) {
      return res.status(400).send({ status: "error", error: "User already exists" });
    }

    const hashedPassword = await createHash(password);
    const user = { first_name, last_name, email, password: hashedPassword };

    const result = await usersService.create(user);
    return res.send({ status: "success", payload: result._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: "error", error: "Register failed" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }

  const user = await usersService.getUserByEmail(email);
  if (!user) {
    return res.status(404).send({ status: "error", error: "User doesn't exist" });
  }

  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) {
    return res.status(400).send({ status: "error", error: "Incorrect password" });
  }

  const userDto = UserDTO.getUserTokenFrom(user);

  // 👉 Generar token seguro
  const token = generateToken(userDto);

  res
    .cookie('coderCookie', token, { maxAge: 3600000, httpOnly: true })
    .send({ status: "success", message: "Logged in" });
};

const current = async (req, res) => {
  try {
    const cookie = req.cookies['coderCookie'];
    if (!cookie) {
      return res.status(401).send({ status: "error", error: "No token" });
    }

    const user = verifyToken(cookie);
    return res.send({ status: "success", payload: user });
  } catch (err) {
    return res.status(403).send({ status: "error", error: "Invalid token" });
  }
};

const unprotectedLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ status: "error", error: "Incomplete values" });
  }

  const user = await usersService.getUserByEmail(email);
  if (!user) {
    return res.status(404).send({ status: "error", error: "User doesn't exist" });
  }

  const isValidPassword = await passwordValidation(user, password);
  if (!isValidPassword) {
    return res.status(400).send({ status: "error", error: "Incorrect password" });
  }

  // 👉 En este caso devolvemos el usuario completo en el token
  const token = generateToken(user);

  res
    .cookie('unprotectedCookie', token, { maxAge: 3600000, httpOnly: true })
    .send({ status: "success", message: "Unprotected Logged in" });
};

const unprotectedCurrent = async (req, res) => {
  try {
    const cookie = req.cookies['unprotectedCookie'];
    if (!cookie) {
      return res.status(401).send({ status: "error", error: "No token" });
    }

    const user = verifyToken(cookie);
    return res.send({ status: "success", payload: user });
  } catch (err) {
    return res.status(403).send({ status: "error", error: "Invalid token" });
  }
};

export default {
  register,
  login,
  current,
  unprotectedLogin,
  unprotectedCurrent
};
