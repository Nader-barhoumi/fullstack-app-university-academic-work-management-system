import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationCreateAcademicInstitution1746327062657 implements MigrationInterface {
    name = 'MigrationCreateAcademicInstitution1746327062657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`	CREATE TABLE academic_institution (
            id INT PRIMARY KEY DEFAULT 1,
            name VARCHAR(100) NOT NULL,
            university VARCHAR(100) NOT NULL,
            phone INT NOT NULL,
            fax INT,
            address_id INT NULL,
            email VARCHAR(255) NOT NULL,
            director VARCHAR(100) NOT NULL,
            logo_url VARCHAR(255) DEFAULT 'assets/images/default-logo.png'
        )`);
        await queryRunner.query(`ALTER TABLE "academic_institution" ADD CONSTRAINT fk_institution_address FOREIGN KEY (address_id) REFERENCES addresses(id)`);
        
        // Insert initial academic institution record
        await queryRunner.query(`INSERT INTO academic_institution (id, name, university, phone, email, director) 
            VALUES (1, 'Default Institution', 'Default University', 1234567890, 'default@university.edu', 'Default Director')`);
    }
    // public async up(queryRunner: QueryRunner): Promise<void> {
    //     await queryRunner.query(`CREATE TABLE "academic_institution" ("id" SERIAL NOT NULL,
    //          "name" character varying(100) NOT NULL,
    //           "university" character varying(100) NOT NULL, 
    //           "phone" integer NOT NULL, "fax" integer, 
    //           "email" character varying(255) NOT NULL, 
    //           "director" character varying(100) NOT NULL, 
    //           "logo_url" character varying(255), 
    //           "Address" integer, CONSTRAINT 
    //           "REL_11539413e6d4aee9125461c921" UNIQUE ("Address"), 
    //           CONSTRAINT "CHK_b93bc1dd9922c8ace4976eba2a" CHECK (id = 1), 
    //           CONSTRAINT "PK_a06c70246345f2263f874d38e99" PRIMARY KEY ("id"))`);
       
    //     await queryRunner.query(`ALTER TABLE "academic_institution" 
    //           ADD CONSTRAINT "FK_11539413e6d4aee9125461c9219" FOREIGN KEY ("Address") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    // }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "academic_institution" DROP CONSTRAINT "fk_institution_address"`);
        await queryRunner.query(`DROP TABLE "academic_institution"`);
    }

}
