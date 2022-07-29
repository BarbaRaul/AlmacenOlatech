import {Router} from 'express';

import articulo from './articulo';
import categoria from './categoria';


const routes =  Router();

routes.use('/categorias', categoria);
routes.use('/articulos', articulo);


export default routes;


