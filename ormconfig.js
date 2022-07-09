require('dotenv/config');

const devConfig = {
  type: 'postgres',
  host: process.env.HOST,
  port: process.env.PG_PORT,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: true,
  entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  cli: {
    entitiesDir: './src/modules/**/infra/typeorm/entities',
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
};

const prodConfig = {
  type: 'postgres',
  host: process.env.HOST,
  port: process.env.PG_PORT,
  /*ssl: {
    rejectUnauthorized: false,
  },*/
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  synchronize: false,
  logging: true,
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
  cli: {
    entitiesDir: './dist/modules/**/infra/typeorm/entities',
    migrationsDir: './dist/shared/infra/typeorm/migrations',
  },
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
