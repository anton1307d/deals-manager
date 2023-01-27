import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1674820740978 implements MigrationInterface {
    name = 'InitMigration1674820740978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."deal_source_enum" AS ENUM('income', 'other', 'custom-source')`);
        await queryRunner.query(`CREATE TABLE "deal" ("id" SERIAL NOT NULL, "sum" integer NOT NULL, "description" character varying NOT NULL, "source" "public"."deal_source_enum" NOT NULL DEFAULT 'income', "finishedAt" date NOT NULL, CONSTRAINT "PK_9ce1c24acace60f6d7dc7a7189e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "deal"`);
        await queryRunner.query(`DROP TYPE "public"."deal_source_enum"`);
    }

}
