import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {validate} from "../middlewares/validate.middleware";
import {loginSchema} from "../schemas/auth.schema";

const app = express.Router();

// ROTA DE LOGIN PROTEGIDA PELO ZOD
app.post('/login', validate(loginSchema), AuthController.login);

export default app;
