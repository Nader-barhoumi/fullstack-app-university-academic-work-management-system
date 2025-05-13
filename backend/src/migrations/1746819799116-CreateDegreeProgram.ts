// migrations/1234567890-CreateDegreeProgram.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDegreeProgram1746819799116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE degree_program (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        code VARCHAR(10) NULL UNIQUE,
        duration_years INT NOT NULL,
        description TEXT,
        institution VARCHAR(20)
)`);
  
    await queryRunner.query(`ALTER TABLE degree_program ADD CONSTRAINT fk_degree_institution FOREIGN KEY (institution) REFERENCES academic_institutions(name)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE degree_program`);
  }
}