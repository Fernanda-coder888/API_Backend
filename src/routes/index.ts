import { Router } from 'express';
import userRoutes from './user.route';
import { cli } from 'winston/lib/winston/config';
import clienteRoutes from './cliente.route';



const routes = Router();


routes.use(userRoutes);
routes.use(clienteRoutes);


// routes.use('/clientes', clienteRoutes);
// routes.use('/testes', testeRoutes);

export default routes;