import express, { IRouter } from 'express';
const router = express.Router();

import userRoute from './user.route';
import noteRoute from './notes.route';


const routes = (): IRouter => {
  router.post('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', new userRoute().getRoutes());
  router.use('/notes',new noteRoute().notesRoutes())
  return router;
};

export default routes;
