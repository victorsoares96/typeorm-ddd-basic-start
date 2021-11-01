import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import { Connection } from 'typeorm';
import uploadConfig from './config/upload';
import {
  accessProfilesRouter,
  permissionsRouter,
  sessionsRouter,
  usersRouter,
} from './routes';

import connection from './database';
import errorHandler from './middlewares/errorHandler';

class App {
  public express: express.Application;

  public connection: Promise<Connection>;

  public constructor() {
    this.express = express();
    this.express.use(express.json());

    this.connection = connection();

    this.database();
    this.routes();
    this.middlewares();
  }

  private middlewares(): void {
    this.express.use(errorHandler);
  }

  private database(): void {
    this.connection
      .then(() => {
        console.log('📦  Connected to database!');
        this.startServer();
      })
      .catch(error => {
        console.log('❌  Error when initializing the database.');
        console.error(error);
      });
  }

  private startServer(): void {
    this.express.listen(3333, () => {
      console.log('🚀  Server started on port 3333');
    });
  }

  private routes(): void {
    this.express.use('/files', express.static(uploadConfig.directory));

    this.express.use(sessionsRouter);
    this.express.use(usersRouter);
    this.express.use(accessProfilesRouter);
    this.express.use(permissionsRouter);
  }
}

export default new App().express;
