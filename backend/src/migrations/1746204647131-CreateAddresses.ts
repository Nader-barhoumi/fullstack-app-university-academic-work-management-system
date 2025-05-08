import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddressesTable1746204647131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE addresses (
        id SERIAL PRIMARY KEY,
        address_details VARCHAR(255) NOT NULL,
        zip_code INTEGER NOT NULL,
        city VARCHAR(20),
        state States NOT NULL,
        additional_details VARCHAR(255)
    )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE addresses`);
  }
}