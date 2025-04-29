// src/migrations/1634567890124-CreateStatesTable.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatesTable1634567890124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE states (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        code VARCHAR(2) NOT NULL UNIQUE
      )
    `);
    await queryRunner.query(`CREATE INDEX idx_states_code ON states(code)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE states`);
  }
}