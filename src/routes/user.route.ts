import express from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middlewares/validate.middleware';
import { createUserSchema, updateUserSchema } from '../schemas/user.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

const app = express.Router();

// A ROTA DO POST SERÁ PÚBLICA, POIS O USUÁRO VAI CRIAR SUA CONTA
// POR ISSO, NÃO PRECISA DE AUTHMIDDLEWARE
app.post('/users', validate(createUserSchema), UserController.createUser);

// ROTAS PRIVADAS PROTEGIDAS PELO AUTHMIDDLEWARE
app.get('/users', authMiddleware, UserController.getAllUsers);
app.get('/users/:id', authMiddleware, UserController.getUserById);
app.put('/users/:id', authMiddleware, validate(updateUserSchema), UserController.updateUser);
app.delete('/users/:id', authMiddleware, UserController.deleteUser);

export default app;