import {MigrationInterface, QueryRunner} from "typeorm";

export class addRefreshToken1658012019470 implements MigrationInterface {
    name = 'addRefreshToken1658012019470'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refreshToken" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "expires_in" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_be91607b0697b092c2bdff83b45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "refreshToken" ADD CONSTRAINT "FK_2e2af61380bb7341e2025d7b570" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refreshToken" DROP CONSTRAINT "FK_2e2af61380bb7341e2025d7b570"`);
        await queryRunner.query(`DROP TABLE "refreshToken"`);
    }

}
