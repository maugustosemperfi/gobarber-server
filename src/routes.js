import { Router } from 'express';
import multer from 'multer';
import AppointmentController from './app/controllers/AppointmentController';
import FileController from './app/controllers/FileController';
import NotificationController from './app/controllers/NotificationController';
import ProviderController from './app/controllers/ProviderController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users/:id', UserController.update);

routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.getAll);

routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.getAll);
routes.get('/appointments/provider', AppointmentController.getAllByProvider);
routes.delete('/appointments/:id', AppointmentController.delete);
routes.get('/notifications', NotificationController.getAll);
routes.put('/notifications/:id', NotificationController.update);

export default routes;
