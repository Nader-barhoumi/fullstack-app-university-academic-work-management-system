import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStatesEnum1746204647130 implements MigrationInterface {
      public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TYPE States AS ENUM ('Tunis',
        'Ariana',
        'Manouba',
        'Ben Arous',
        'Nabeul',
        'Zaghouan',
        'Béja',
        'Jendouba',
        'Kasserine',
        'Kef',
        'Siliana',
        'Sousse',
        'Monastir',
        'Mahdia',
        'Sfax',
        'Kairouan',
        'Sidi Bouzid',
        'Gafsa',
        'Tozeur',
        'Kébili',
        'Medenine',
        'Tataouine',
        'Gabès'
        )
        `);
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE States`);
      }
    }