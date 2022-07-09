"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDatabase1648476747516 = void 0;

class initializeDatabase1648476747516 {
  constructor() {
    this.name = 'initializeDatabase1648476747516';
  }

  async up(queryRunner) {
    await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_240853a0c3353c25fb12434ad33" UNIQUE ("name"), CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "full_name" character varying NOT NULL, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying, "created_by_name" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" character varying, "updated_by_name" character varying, "deletion_date" TIMESTAMP, "last_access" character varying, "avatar" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "accessProfileId" integer, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "access_profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "status" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying, "created_by_name" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_by_id" character varying, "updated_by_name" character varying, "deletion_date" TIMESTAMP, CONSTRAINT "UQ_d119c02b32e455f1d52067fb8e2" UNIQUE ("name"), CONSTRAINT "PK_190a724cde4235b989e7f11e37f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "access_profiles_permissions" ("accessProfileId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "PK_63ded2c06fe50f5eda2b31d7ab2" PRIMARY KEY ("accessProfileId", "permissionId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_eba6860730fc17e3c58d5bf957" ON "access_profiles_permissions" ("accessProfileId") `);
    await queryRunner.query(`CREATE INDEX "IDX_940f523eb8bf1d3680cee875f7" ON "access_profiles_permissions" ("permissionId") `);
    await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_5a2922ec9809f3f794c9924ae9a" FOREIGN KEY ("accessProfileId") REFERENCES "access_profile"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "access_profiles_permissions" ADD CONSTRAINT "FK_eba6860730fc17e3c58d5bf957e" FOREIGN KEY ("accessProfileId") REFERENCES "access_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    await queryRunner.query(`ALTER TABLE "access_profiles_permissions" ADD CONSTRAINT "FK_940f523eb8bf1d3680cee875f73" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "access_profiles_permissions" DROP CONSTRAINT "FK_940f523eb8bf1d3680cee875f73"`);
    await queryRunner.query(`ALTER TABLE "access_profiles_permissions" DROP CONSTRAINT "FK_eba6860730fc17e3c58d5bf957e"`);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_5a2922ec9809f3f794c9924ae9a"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_940f523eb8bf1d3680cee875f7"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_eba6860730fc17e3c58d5bf957"`);
    await queryRunner.query(`DROP TABLE "access_profiles_permissions"`);
    await queryRunner.query(`DROP TABLE "access_profile"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }

}

exports.initializeDatabase1648476747516 = initializeDatabase1648476747516;