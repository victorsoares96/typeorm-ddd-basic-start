import 'reflect-metadata';

import express from 'express';
import { container } from 'tsyringe';
import 'express-async-errors';

import { Connection } from 'typeorm';
import uploadConfig from '@config/upload';

import connection from '@shared/infra/typeorm';

import { PermissionsRepositoryMethods } from '@modules/permissions/repositories/PermissionsRepositoryMethods';
import { PermissionRepository } from '@modules/permissions/infra/typeorm/repositories/PermissionRepository';

import { AccessProfilesRepositoryMethods } from '@modules/accessProfiles/repositories/AccessProfilesRepositoryMethods';
import { AccessProfileRepository } from '@modules/accessProfiles/infra/typeorm/repositories/AccessProfileRepository';

import { UsersRepositoryMethods } from '@modules/users/repositories/UsersRepositoryMethods';
import { UserRepository } from '@modules/users/infra/typeorm/repositories/UserRepository';

import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { accessProfilesRouter } from '@modules/accessProfiles/infra/http/routes/access-profiles.routes';
import { permissionsRouter } from '@modules/permissions/infra/http/routes/permissions.routes';

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

  private tsyringe(): void {
    container.registerSingleton<PermissionsRepositoryMethods>(
      'PermissionsRepository',
      PermissionRepository,
    );

    container.registerSingleton<AccessProfilesRepositoryMethods>(
      'AccessProfilesRepository',
      AccessProfileRepository,
    );

    container.registerSingleton<UsersRepositoryMethods>(
      'UsersRepository',
      UserRepository,
    );
  }

  private database(): void {
    this.connection
      .then(() => {
        console.log(`📦  Connected to ${process.env.DATABASE}!`);
        this.startServer();
        this.tsyringe();
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
    this.express.use('/files', express.static(uploadConfig.uploadsFolder));

    this.express.use(sessionsRouter);
    this.express.use(usersRouter);
    this.express.use(accessProfilesRouter);
    this.express.use(permissionsRouter);
  }
}

export default new App().express;
