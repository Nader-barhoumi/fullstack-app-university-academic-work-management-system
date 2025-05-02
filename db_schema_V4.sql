-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Enumeration types
CREATE TYPE progress_status AS ENUM ('on_going', 'finished');
CREATE TYPE decision_status AS ENUM ('Pending', 'Accepted', 'Canceled', 'Refused');
CREATE TYPE role_type AS ENUM ('student', 'teacher', 'industrial_tutor', 'admin');
CREATE TYPE position_type AS ENUM ('Assistant_prof', 'Professor', 'Headmaster');
CREATE TYPE jury_spec AS ENUM ('president', 'reporter');
CREATE TYPE arch_mod AS ENUM ('statusless_archival', 'archival_after_revision', 'non_archival');
CREATE TYPE sex_type AS ENUM ('male', 'female');
CREATE TYPE category_type AS ENUM ('required', 'optional');
CREATE TYPE project_type AS ENUM ('industrial', 'didacted', 'tutored');
-- CREATE TYPE department_type AS ENUM ('computer_science', 'mecanics'); -- Added missing enum for department reference
CREATE TYPE lvl_type AS ENUM ('1', '2', '3');
CREATE TYPE work_type AS ENUM ('summer internship', 'final year project', 'memoir', 'thesis');
CREATE TYPE defense_decision AS ENUM ('passed', 'failed', 'delayed');
CREATE TYPE work_status AS ENUM ('active', 'complete', 'archived');
CREATE TYPE signature_type AS ENUM ('digital', 'manual', 'biometric');
CREATE TYPE States AS ENUM ('Tunis','Ariana','Manouba','Ben Arous',' Nabeul','Zaghouan','Béja','Jendouba','Kasserine','Kef','Siliana','Sousse','Monastir','Mahdia','Sfax','Kairouan','Sidi Bouzid','Gafsa','Tozeur','Kébili','Medenine','Tataouine','Gabès')

-- Phase 1: Create all tables without foreign key references
-- Base tables (no foreign keys)
CREATE TABLE states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    code VARCHAR(2) NOT NULL UNIQUE
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    address_details VARCHAR(255) NOT NULL,
    zip_code INTEGER NOT NULL,
    city VARCHAR(20) NOT NULL,
    state_name VARCHAR(30) NOT NULL,
    additional_details VARCHAR(255)
);

CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    code VARCHAR(10) NOT NULL UNIQUE
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    external_id UUID UNIQUE DEFAULT uuid_generate_v4(),
    profile_picture VARCHAR(255) NOT NULL DEFAULT 'no image',
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    cin VARCHAR(8) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL DEFAULT crypt('default', gen_salt('bf')),
    role role_type NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    address_id INT,
    reset_token VARCHAR(100),
    reset_token_expiry TIMESTAMP,
    last_login TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    external_id UUID UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    legal_name VARCHAR(100),
    field VARCHAR(50),
    address_id INT,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    website VARCHAR(255),
    founded_year INT,
    active_internships INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE academic_institutions (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    university VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    fax VARCHAR(20),
    address_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    director VARCHAR(100) NOT NULL
);

CREATE TABLE degree_program (
    id VARCHAR(20) PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    duration_years INT NOT NULL,
    description TEXT,
    institution_id VARCHAR(20)
);

CREATE TABLE majors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    degree_program_id VARCHAR(20)
);

CREATE TABLE specialities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    degree_program_id VARCHAR(20),
    description TEXT
);

CREATE TABLE signature_objects (
    id SERIAL PRIMARY KEY,
    user_id INT,
    signer_name VARCHAR(100),
    external_email VARCHAR(100),
    signature_type VARCHAR(20) NOT NULL,
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW(),
    is_verified BOOLEAN DEFAULT FALSE,
    verified_by INT,
    verified_at TIMESTAMP,
    is_revoked BOOLEAN DEFAULT FALSE,
    revoked_at TIMESTAMP
);

CREATE TABLE signatures (
    id SERIAL PRIMARY KEY,
    signature_object_id INT NOT NULL,
    signer_user_id INT,
    signer_email VARCHAR(100),
    signed_at TIMESTAMP DEFAULT NOW(),
    ip_address VARCHAR(45),
    user_agent TEXT,
    is_validated BOOLEAN DEFAULT FALSE,
    validated_by INT,
    validated_at TIMESTAMP
);

CREATE TABLE students (
    user_id INT PRIMARY KEY,
    sex sex_type,
    student_id VARCHAR(10) NOT NULL,
    department NOT NULL,
    degree VARCHAR(20) NOT NULL,
    major VARCHAR(50) NOT NULL,
    specialization VARCHAR(50) NOT NULL,
    level lvl_type NOT NULL
);

CREATE TABLE teacher (
    user_id INT PRIMARY KEY,
    title VARCHAR(50),
    position position_type,
    department NOT NULL,
    office_location VARCHAR(50),
    institution_id VARCHAR(20)
);

CREATE TABLE industrial_tutors (
    user_id INT PRIMARY KEY,
    company_id INT NOT NULL,
    job_title VARCHAR(50) NOT NULL
);

CREATE TABLE admins (
    user_id INT PRIMARY KEY,
    position VARCHAR(50) NOT NULL,
    access_level INT NOT NULL DEFAULT 1,
    can_manage_users BOOLEAN DEFAULT TRUE
);

CREATE TABLE academic_work (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    is_work_required BOOLEAN NOT NULL,
    work_type work_type NOT NULL,
    internship_required BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    max_collaborators INT DEFAULT 1,
    status work_status NOT NULL DEFAULT 'active',
    start_date DATE,
    end_date DATE
);

CREATE TABLE responsibilities (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    academic_work_id INT NOT NULL,
    role VARCHAR(50) NOT NULL,
    assigned_by INT,
    assigned_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE specifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    objectives TEXT NOT NULL,
    main_tasks TEXT NOT NULL,
    student_profile TEXT NOT NULL,
    academic_tutor_signature INT,
    industrial_tutor_signature INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE internships (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    academic_work_id INT,
    company_id INT NOT NULL,
    industrial_tutor_id INT NOT NULL,
    academic_tutor_id INT,
    internship_type category_type NOT NULL DEFAULT 'required',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    academic_tutor_signature INT,
    industrial_tutor_signature INT NOT NULL,
    company_signature INT NOT NULL,
    status progress_status NOT NULL DEFAULT 'on_going',
    specifications_id INT
);

CREATE TABLE specification_signatures (
    specification_id INT NOT NULL,
    signature_id INT NOT NULL,
    PRIMARY KEY (specification_id, signature_id)
);

CREATE TABLE prototypes (
    id SERIAL PRIMARY KEY,
    academic_work_id INT NOT NULL,
    submitted_at TIMESTAMP DEFAULT NOW(),
    file_url VARCHAR(500) NOT NULL,
    status decision_status NOT NULL DEFAULT 'Pending',
    review_comments TEXT
);

CREATE TABLE rooms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NOT NULL,
    capacity INT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE room_reservations (
    id SERIAL PRIMARY KEY,
    room_id INT NOT NULL,
    user_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status progress_status NOT NULL DEFAULT 'on_going',
    purpose VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE jury_evaluations (
    id SERIAL PRIMARY KEY,
    defense_id INT NOT NULL,
    supervisor_id INT NOT NULL,
    president_id INT NOT NULL,
    reporter_id INT NOT NULL,
    score INT NOT NULL,
    evaluation_comments TEXT,
    evaluation_date TIMESTAMP DEFAULT NOW(),
    jury_role jury_spec NOT NULL
);

CREATE TABLE defenses (
    id SERIAL PRIMARY KEY,
    academic_work_id INT NOT NULL,
    prototype_id INT,
    reservation_id INT,
    decision defense_decision NOT NULL,
    jury_evaluation_id INT
);

CREATE TABLE final_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    academic_work_id INT NOT NULL,
    internship_id INT,
    type project_type NOT NULL,
    keywords TEXT[],
    required_skills TEXT[],
    decision decision_status NOT NULL DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE research_memoirs (
    id SERIAL PRIMARY KEY,
    academic_work_id INT NOT NULL,
    academic_tutor_id INT NOT NULL,
    status progress_status NOT NULL DEFAULT 'on_going',
    laboratory VARCHAR(100) NOT NULL,
    tutor_signature_id INT NOT NULL,
    lab_director VARCHAR(100) NOT NULL,
    summary TEXT NOT NULL,
    keywords TEXT[],
    decision decision_status NOT NULL DEFAULT 'Pending',
    submission_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE documents (
    id VARCHAR(50) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    uploaded_by INT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW(),
    file_size BIGINT,
    file_type VARCHAR(10)
);

CREATE TABLE invitations (
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_firstname VARCHAR(50) NOT NULL,
    receiver_lastname VARCHAR(50) NOT NULL,
    receiver_email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    company_name INT,
    receiver_id INT NOT NULL,
    message TEXT,
    signature_id INT
);

CREATE TABLE audits (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(50) NOT NULL,
    record_id INT NOT NULL,
    action_type VARCHAR(20) NOT NULL,
    old_data JSONB,
    new_data JSONB,
    performed_by INT,
    performed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tutor_change_requests (
    id SERIAL PRIMARY KEY,
    internship_id INT NOT NULL,
    student_id INT NOT NULL,
    current_tutor_id INT NOT NULL,
    new_tutor_id INT NOT NULL,
    reason TEXT NOT NULL,
    status decision_status NOT NULL DEFAULT 'Pending',
    admin_validation BOOLEAN DEFAULT FALSE,
    validated_by INT,
    validated_at TIMESTAMP,
    new_tutor_signature INT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE diploma_delivery (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    academic_work_id INT NOT NULL,
    jury_evaluation_id INT NOT NULL,
    submitted_work BOOLEAN NOT NULL DEFAULT FALSE,
    returned_belongings BOOLEAN NOT NULL DEFAULT FALSE,
    diploma_id VARCHAR(500),
    delivered_by INT,
    delivered_at TIMESTAMP,
    status decision_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
-- messages realted part of the schema
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    is_group BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE conversation_participants (
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    joined_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INT REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);
-- chatbot related part of the schema
CREATE TABLE chatbot_conversations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    started_at TIMESTAMP DEFAULT NOW(),
    ended_at TIMESTAMP
);

CREATE TABLE chatbot_messages (
    id SERIAL PRIMARY KEY,
    conversation_id INT REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
    is_user_message BOOLEAN NOT NULL,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT NOW()
);
-- otp verification related part of the schema
CREATE TYPE otp_purpose AS ENUM ('document_confirmation', 'user_authentication', 'other');

CREATE TABLE otp_verifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    purpose otp_purpose NOT NULL DEFAULT 'other',
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    document_id VARCHAR(50) REFERENCES documents(id)
);
-- Phase 2: Add all constraints and foreign key references

-- Address table constraints
ALTER TABLE address
    ADD CONSTRAINT fk_address_state FOREIGN KEY (state_name) REFERENCES states(name);

-- Users table constraints
ALTER TABLE users
    ADD CONSTRAINT fk_users_address FOREIGN KEY (address_id) REFERENCES address(id),
    ADD CONSTRAINT check_cin CHECK (cin ~ '^[0-9]{8}$'),
    ADD CONSTRAINT check_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    ADD CONSTRAINT check_phone CHECK (phone ~ '^[0-9]{10,15}$'),
    ADD CONSTRAINT unique_cin UNIQUE(cin),
    ADD CONSTRAINT unique_email UNIQUE(email);

-- Companies table constraints
ALTER TABLE companies
    ADD CONSTRAINT fk_companies_address FOREIGN KEY (address_id) REFERENCES address(id),
    ADD CONSTRAINT check_company_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    ADD CONSTRAINT check_company_phone CHECK (phone ~ '^[0-9]{8,13}$');

-- Academic institutions constraints
ALTER TABLE academic_institutions
    ADD CONSTRAINT fk_institution_address FOREIGN KEY (address_id) REFERENCES address(id),
    ADD CONSTRAINT check_institution_phone CHECK (phone ~ '^[0-9]{10,15}$'),
    ADD CONSTRAINT check_institution_email CHECK (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

-- Degree program constraints
ALTER TABLE degree_program
    ADD CONSTRAINT fk_degree_institution FOREIGN KEY (institution_id) REFERENCES academic_institutions(id);

-- Majors constraints
ALTER TABLE majors
    ADD CONSTRAINT fk_majors_degree FOREIGN KEY (degree_program_id) REFERENCES degree_program(id) ON DELETE CASCADE;

-- Specialities constraints
ALTER TABLE specialities
    ADD CONSTRAINT fk_specialties_degree FOREIGN KEY (degree_program_id) REFERENCES degree_program(id) ON DELETE CASCADE;

-- Signature objects constraints
ALTER TABLE signature_objects
    ADD CONSTRAINT fk_signature_objects_user FOREIGN KEY (user_id) REFERENCES users(id),
    ADD CONSTRAINT fk_signature_objects_verifier FOREIGN KEY (verified_by) REFERENCES users(id),
    ADD CONSTRAINT check_external_email CHECK (external_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    ADD CONSTRAINT check_signature_type CHECK (signature_type IN ('manual', 'digital', 'biometric'));

-- Signatures constraints
ALTER TABLE signatures
    ADD CONSTRAINT fk_signatures_object FOREIGN KEY (signature_object_id) REFERENCES signature_objects(id),
    ADD CONSTRAINT fk_signatures_signer FOREIGN KEY (signer_user_id) REFERENCES users(id),
    ADD CONSTRAINT fk_signatures_validator FOREIGN KEY (validated_by) REFERENCES users(id),
    ADD CONSTRAINT check_signer_email CHECK (signer_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$');

-- Students constraints
ALTER TABLE students
    ADD CONSTRAINT fk_students_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_students_degree FOREIGN KEY (degree) REFERENCES degree_program(name),
    ADD CONSTRAINT fk_students_major FOREIGN KEY (major) REFERENCES majors(name),
    ADD CONSTRAINT fk_students_specialization FOREIGN KEY (specialization) REFERENCES specialities(name),
    ADD CONSTRAINT unique_student_dept UNIQUE(student_id, department);

-- Teacher constraints
ALTER TABLE teacher
    ADD CONSTRAINT fk_department_name FOREIGN KEY (department) REFERENCES departments(name),
    ADD CONSTRAINT fk_teacher_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_teacher_institution FOREIGN KEY (institution_id) REFERENCES academic_institutions(id);

-- Industrial tutors constraints
ALTER TABLE industrial_tutors
    ADD CONSTRAINT fk_industrial_tutors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    ADD CONSTRAINT fk_industrial_tutors_company FOREIGN KEY (company_id) REFERENCES companies(id);

-- Admins constraints
ALTER TABLE admins
    ADD CONSTRAINT fk_admins_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;

-- Academic work constraints
ALTER TABLE academic_work
    ADD CONSTRAINT fk_academic_work_student FOREIGN KEY (student_id) REFERENCES students(user_id),
    ADD CONSTRAINT check_max_collaborators CHECK (max_collaborators BETWEEN 1 AND 2),
    ADD CONSTRAINT check_dates CHECK (start_date < end_date OR (start_date IS NULL AND end_date IS NULL)),
    ADD CONSTRAINT unique_student_work_type UNIQUE(student_id, work_type);

-- Responsibilities constraints
ALTER TABLE responsibilities
    ADD CONSTRAINT fk_responsibilities_user FOREIGN KEY (user_id) REFERENCES users(id),
    ADD CONSTRAINT fk_responsibilities_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_responsibilities_assigner FOREIGN KEY (assigned_by) REFERENCES users(id),
    ADD CONSTRAINT check_role CHECK (role IN ('academic_tutor', 'jury_member')),
    ADD CONSTRAINT unique_user_work_role UNIQUE (user_id, academic_work_id, role);

-- Specifications constraints
ALTER TABLE specifications
    ADD CONSTRAINT fk_specifications_academic_signature FOREIGN KEY (academic_tutor_signature) REFERENCES signatures(id),
    ADD CONSTRAINT fk_specifications_industrial_signature FOREIGN KEY (industrial_tutor_signature) REFERENCES signatures(id),
    ADD CONSTRAINT check_objectives_length CHECK (LENGTH(objectives) > 10),
    ADD CONSTRAINT check_main_tasks_length CHECK (LENGTH(main_tasks) > 10);

-- Internships constraints
ALTER TABLE internships
    ADD CONSTRAINT fk_internships_student FOREIGN KEY (student_id) REFERENCES students(user_id),
    ADD CONSTRAINT fk_internships_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_internships_company FOREIGN KEY (company_id) REFERENCES companies(id),
    ADD CONSTRAINT fk_internships_industrial_tutor FOREIGN KEY (industrial_tutor_id) REFERENCES industrial_tutors(user_id),
    ADD CONSTRAINT fk_internships_academic_tutor FOREIGN KEY (academic_tutor_id) REFERENCES teacher(user_id),
    ADD CONSTRAINT fk_internships_academic_signature FOREIGN KEY (academic_tutor_signature) REFERENCES signatures(id),
    ADD CONSTRAINT fk_internships_industrial_signature FOREIGN KEY (industrial_tutor_signature) REFERENCES signatures(id),
    ADD CONSTRAINT fk_internships_company_signature FOREIGN KEY (company_signature) REFERENCES signatures(id),
    ADD CONSTRAINT fk_internships_specifications FOREIGN KEY (specifications_id) REFERENCES specifications(id),
    ADD CONSTRAINT check_internship_dates CHECK (end_date > start_date),
    ADD CONSTRAINT check_required_academic_tutor CHECK (
        internship_type = 'optional' OR 
        (academic_tutor_id IS NOT NULL AND academic_tutor_signature IS NOT NULL)
    );-- Ensure academic tutor is required for required internships

-- Specification signatures constraints
ALTER TABLE specification_signatures
    ADD CONSTRAINT fk_spec_sig_specification FOREIGN KEY (specification_id) REFERENCES specifications(id),
    ADD CONSTRAINT fk_spec_sig_signature FOREIGN KEY (signature_id) REFERENCES signatures(id);

-- Prototypes constraints
ALTER TABLE prototypes
    ADD CONSTRAINT fk_prototypes_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id);

-- Rooms constraints
ALTER TABLE rooms
    ADD CONSTRAINT check_room_capacity CHECK (capacity > 0);

-- Room reservations constraints
ALTER TABLE room_reservations
    ADD CONSTRAINT fk_reservations_room FOREIGN KEY (room_id) REFERENCES rooms(id),
    ADD CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES users(id),
    ADD CONSTRAINT check_reservation_date CHECK (reservation_date >= CURRENT_DATE),
    ADD CONSTRAINT check_reservation_time CHECK (end_time > start_time);

-- Break circular dependency by deferring one constraint
ALTER TABLE jury_evaluations
    ADD CONSTRAINT fk_jury_defense FOREIGN KEY (defense_id) REFERENCES defenses(id) DEFERRABLE INITIALLY DEFERRED,
    ADD CONSTRAINT fk_jury_supervisor FOREIGN KEY (supervisor_id) REFERENCES teacher(user_id),
    ADD CONSTRAINT fk_jury_president FOREIGN KEY (president_id) REFERENCES teacher(user_id),
    ADD CONSTRAINT fk_jury_reporter FOREIGN KEY (reporter_id) REFERENCES teacher(user_id),
    ADD CONSTRAINT check_jury_score CHECK (score BETWEEN 0 AND 20),
    ADD CONSTRAINT unique_defense_jury UNIQUE(defense_id);

-- Defenses constraints
ALTER TABLE defenses
    ADD CONSTRAINT fk_defenses_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_defenses_prototype FOREIGN KEY (prototype_id) REFERENCES prototypes(id),
    ADD CONSTRAINT fk_defenses_reservation FOREIGN KEY (reservation_id) REFERENCES room_reservations(id);
-- Final projects constraints
ALTER TABLE final_projects
    ADD CONSTRAINT fk_final_projects_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_final_projects_internship FOREIGN KEY (internship_id) REFERENCES internships(id);

-- Research memoirs constraints
ALTER TABLE research_memoirs
    ADD CONSTRAINT fk_research_memoirs_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_research_memoirs_tutor FOREIGN KEY (academic_tutor_id) REFERENCES teacher(user_id),
    ADD CONSTRAINT fk_research_memoirs_signature FOREIGN KEY (tutor_signature_id) REFERENCES signatures(id);

-- Documents constraints
ALTER TABLE documents
    ADD CONSTRAINT fk_documents_uploader FOREIGN KEY (uploaded_by) REFERENCES users(id);

-- Invitations constraints
ALTER TABLE invitations
    ADD CONSTRAINT fk_invitations_sender FOREIGN KEY (sender_id) REFERENCES admins(user_id),
    ADD CONSTRAINT fk_invitations_signature FOREIGN KEY (signature_id) REFERENCES signatures(id),
    ADD CONSTRAINT check_receiver_email CHECK (receiver_email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
    ADD CONSTRAINT check_invitation_phone CHECK (phone ~ '^[0-9]{8,13}$');

-- Audits constraints
ALTER TABLE audits
    ADD CONSTRAINT fk_audits_user FOREIGN KEY (performed_by) REFERENCES users(id),
    ADD CONSTRAINT check_action_type CHECK (action_type IN ('create', 'update', 'delete'));

-- Tutor change requests constraints
ALTER TABLE tutor_change_requests
    ADD CONSTRAINT fk_tcr_internship FOREIGN KEY (internship_id) REFERENCES internships(id),
    ADD CONSTRAINT fk_tcr_student FOREIGN KEY (student_id) REFERENCES students(user_id),
    ADD CONSTRAINT fk_tcr_current_tutor FOREIGN KEY (current_tutor_id) REFERENCES industrial_tutors(user_id),
    ADD CONSTRAINT fk_tcr_new_tutor FOREIGN KEY (new_tutor_id) REFERENCES industrial_tutors(user_id),
    ADD CONSTRAINT fk_tcr_validator FOREIGN KEY (validated_by) REFERENCES admins(user_id),
    ADD CONSTRAINT fk_tcr_signature FOREIGN KEY (new_tutor_signature) REFERENCES signatures(id);

-- Diploma delivery constraints
ALTER TABLE diploma_delivery
    ADD CONSTRAINT fk_diploma_student FOREIGN KEY (student_id) REFERENCES students(user_id),
    ADD CONSTRAINT fk_diploma_academic_work FOREIGN KEY (academic_work_id) REFERENCES academic_work(id),
    ADD CONSTRAINT fk_diploma_jury_evaluation FOREIGN KEY (jury_evaluation_id) REFERENCES jury_evaluations(id),
    ADD CONSTRAINT fk_diploma_delivered_by FOREIGN KEY (delivered_by) REFERENCES admins(user_id);
-- phase 3: Add indexes for performance optimization
CREATE INDEX idx_users_email ON users(email); -- For user login and lookups
CREATE INDEX idx_students_student_id ON students(student_id); -- For student-specific queries
CREATE INDEX idx_internships_student_id ON internships(student_id); -- For internship status by student
CREATE INDEX idx_internships_status ON internships(status); -- For filtering active/ongoing internships
CREATE INDEX idx_documents_uploaded_by ON documents(uploaded_by); -- For document retrieval by uploader
CREATE INDEX idx_documents_type ON documents(type); -- For filtering by document type
CREATE INDEX idx_signatures_signature_object_id ON signatures(signature_object_id); -- For signature validation