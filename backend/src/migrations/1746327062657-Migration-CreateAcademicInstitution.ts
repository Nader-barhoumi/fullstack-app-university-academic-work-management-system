import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationCreateAcademicInstitution1746327062657 implements MigrationInterface {
    name = 'MigrationCreateAcademicInstitution1746327062657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "academic_institution" ("id" SERIAL NOT NULL,
             "name" character varying(100) NOT NULL,
              "university" character varying(100) NOT NULL, 
              "phone" integer NOT NULL, "fax" integer, 
              "email" character varying(255) NOT NULL, 
              "director" character varying(100) NOT NULL, 
              "logo_url" character varying(255), 
              "Address" integer, CONSTRAINT 
              "REL_11539413e6d4aee9125461c921" UNIQUE ("Address"), 
              CONSTRAINT "CHK_b93bc1dd9922c8ace4976eba2a" CHECK (id = 1), 
              CONSTRAINT "PK_a06c70246345f2263f874d38e99" PRIMARY KEY ("id"))`);
       
        await queryRunner.query(`ALTER TABLE "academic_institution" 
              ADD CONSTRAINT "FK_11539413e6d4aee9125461c9219" FOREIGN KEY ("Address") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_institution" DROP CONSTRAINT "FK_11539413e6d4aee9125461c9219"`);
        await queryRunner.query(`DROP TABLE "academic_institution"`);
    }

}
