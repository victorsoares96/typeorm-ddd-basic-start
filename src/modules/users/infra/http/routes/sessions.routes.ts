/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Router } from 'express';
import { SessionController } from '../controllers/SessionController';

export const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post('/sessions', sessionsController.handle);
