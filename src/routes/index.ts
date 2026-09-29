import { Router } from 'express';
import userRoutes from './user.route';
import clienteRoutes from './cliente.route';
import authRoutes from './auth.route'; // IMPORTA A ROTA DE AUTENTICAÇÃO

const routes = Router();

routes.use(userRoutes);
routes.use(authRoutes); // ROTA DE AUTENTICAÇÃO
routes.use(clienteRoutes);


// routes.use('/testes', testeRoutes);

export default routes;