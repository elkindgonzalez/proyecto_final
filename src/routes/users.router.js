
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Gestión de usuarios
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         pets:
 *           type: array
 *           items:
 *             type: string
 *       required: [first_name, last_name, email, role]
 *     CreateUserInput:
 *       type: object
 *       required: [first_name, last_name, email, password]
 *       properties:
 *         first_name: { type: string }
 *         last_name:  { type: string }
 *         email:      { type: string, format: email }
 *         password:   { type: string, format: password }
 *         role:       { type: string, enum: [user, admin] }
 */

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 payload:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *   post:
 *     summary: Crear usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 payload:
 *                   $ref: '#/components/schemas/User'
 *       400: { description: Body inválido }
 *
 * /api/users/{uid}:
 *   get:
 *     summary: Obtener usuario por id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: success }
 *                 payload: { $ref: '#/components/schemas/User' }
 *       404: { description: No encontrado }
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *       200: { description: Usuario actualizado }
 *       404: { description: No encontrado }
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204: { description: Eliminado }
 *       404: { description: No encontrado }
 */


import { Router } from 'express';
import usersController from '../controllers/users.controller.js';

const router = Router();

router.get('/', usersController.getAllUsers);
router.get('/:uid', usersController.getUser);
router.post('/', usersController.createUser);   // 👈 nuevo
router.put('/:uid', usersController.updateUser);
router.delete('/:uid', usersController.deleteUser);

export default router;
